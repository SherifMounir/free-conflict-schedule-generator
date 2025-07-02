import sqlite3
from mealpy.utils.space import BinaryVar
from mealpy.evolutionary_based.GA import BaseGA
from mealpy.swarm_based.PSO import OriginalPSO
import numpy as np  # If you use numpy for array operations
import traceback
import json


SEMESTER = "Spring 2025"

# Function to get a database connection
def get_db_connection():
    db_path = 'schedule.db'
    return sqlite3.connect(db_path, timeout=10)  # Added timeout to handle locks

# Function to register a student
# Function to register a student
def register_student(s_name, s_email, s_password, s_gpa, s_level):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO student (s_name, s_email, s_password, s_gpa, s_level)
            VALUES (?, ?, ?, ?, ?)
            """,
            (s_name, s_email, s_password, s_gpa, s_level),
        )
        conn.commit()
        conn.close()
        return {"message": f"Student {s_name} registered successfully!"}
    except sqlite3.IntegrityError as e:
        return {"error": f"Student registration failed: {e}"}
    except Exception as e:
        return {"error": f"Error while registering student: {e}"}

# Function to enroll a student in a course
def enroll_student(student_id, course_code, semester = SEMESTER):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Step 1: Fetch the student's level
        cursor.execute("SELECT s_level FROM student WHERE s_id = ?", (student_id,))
        student = cursor.fetchone()
        if not student:
            return {"error": "Student not found"}

        student_level = student[0]

        # Step 2: Validate the course level
        if len(course_code) >= 3 and course_code[2].isdigit():
            course_level = int(course_code[2])
        elif len(course_code) >= 4 and course_code[3].isdigit():
            course_level = int(course_code[3])
        else:
            course_level = None  # Allow any course without a clear level (e.g., two-digit codes)

        if course_level and course_level > student_level:
            return {"error": f"Student level {student_level} is not eligible for course level {course_level}"}

        # Step 3: Check for duplicate enrollment
        cursor.execute(
            """
            SELECT * FROM enrolled_in
            WHERE s_id = ? AND c_code = ? AND se_semester = ?
            """,
            (student_id, course_code, semester),
        )
        if cursor.fetchone():
            return {"error": "Student is already enrolled in this course for the specified semester"}

        # Step 4: Enroll the student
        cursor.execute(
            """
            INSERT INTO enrolled_in (s_id, c_code, se_semester)
            VALUES (?, ?, ?)
            """,
            (student_id, course_code, semester),
        )
        conn.commit()
        conn.close()

        return {"message": f"Student {student_id} enrolled in course {course_code} for {semester}"}

    except Exception as e:
        return {"error": f"Error enrolling student: {e}"}

def login_student(email, password):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT s_gpa, s_level, s_name, s_id
            FROM student
            WHERE s_email = ? AND s_password = ?
            """,
            (email, password)
        )

        result = cursor.fetchone()
        conn.close()

        if result:
            return {"gpa": result[0], "level": result[1], "name":result[2], "id":result[3]}
        else:
            return {"error": "Invalid email or password"}
    except Exception as e:
        return {"error": f"Error while logging in: {e}"}

# Function to fetch all courses
# def get_all_courses(student_id):
#     """
#     Fetch all courses eligible for a specific student based on their level, GPA, and prerequisites.
#     """
#     try:
#         conn = get_db_connection()
#         cursor = conn.cursor()

#         # Step 1: Fetch student's level and completed courses
#         cursor.execute("SELECT s_level FROM student WHERE s_id = ?", (student_id,))
#         result = cursor.fetchone()
#         if not result:
#             return {"error": "Student not found"}

#         student_level = result[0]

#         # Fetch completed courses
#         cursor.execute(
#             """
#             SELECT c_code
#             FROM enrolled_in
#             WHERE s_id = ?
#             """,
#             (student_id,),
#         )
#         completed_courses = [row[0] for row in cursor.fetchall()]

#         # Step 2: Fetch all courses
#         cursor.execute("SELECT c_code, c_name FROM course")
#         all_courses = cursor.fetchall()

#         eligible_courses = []

#         for course_code, course_name in all_courses:
#             # Step 3: Determine course level from course code
#             if len(course_code) >= 3 and course_code[2].isdigit():
#                 course_level = int(course_code[2])
#             elif len(course_code) >= 4 and course_code[3].isdigit():
#                 course_level = int(course_code[3])
#             else:
#                 course_level = None  # No level restriction for 2-digit codes

#             # Step 4: Filter courses by student level
#             if course_level is not None and course_level > student_level:
#                 continue

#             # Step 5: Check prerequisites
#             cursor.execute(
#                 """
#                 SELECT c_preCourse
#                 FROM prerequisite
#                 WHERE c_code = ?
#                 """,
#                 (course_code,),
#             )
#             prerequisites = [row[0] for row in cursor.fetchall()]

#             # Add course if all prerequisites are met
#             if all(pre in completed_courses for pre in prerequisites):
#                 eligible_courses.append({"course_code": course_code, "course_name": course_name})


#             cursor.execute(
#                 """
#                 SELECT c_code
#                 FROM enrolled_in
#                 WHERE s_id = ?
#                 """,
#                 (student_id,),
#             )

#             enrolled_courses = [row[0] for row in cursor.fetchall()]
#             for course in eligible_courses:
#                 course["enrolled"] = course["course_code"] in enrolled_courses


#             for course in eligible_courses:
#                 cursor.execute(
#                     """
#                 SELECT se_instructor
#                 FROM session
#                 WHERE c_code = ?
#                 """,
#                 (course["course_code"],),
#                 )

#                 instructor = cursor.fetchone()
#                 print(instructor)
#                 if instructor:
#                  course["instructor"] = instructor[0]

#         conn.close()
#         return eligible_courses

#     except Exception as e:
#         return {"error": f"Error while fetching eligible courses: {e}"}

def get_student_profile(student_id):
    """
    Fetch student profile with consistent return type
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT s.s_level, s.s_id, s.s_name, s.s_gpa, s.s_email 
            FROM student s
            WHERE s.s_id = ?
        """, (student_id,))
        
        student_data = cursor.fetchone()
        conn.close()
        
        if not student_data:
            return {"error": "Student not found"}
            
        return student_data  # Returns a tuple

    except Exception as e:
        return {"error": f"Error while fetching student profile: {str(e)}"}
    
def get_all_courses(student_id):
    """
    Fetch all eligible courses for a student, excluding:
    - Courses they've already passed (grade > 'F')
    - Courses they haven't taken or failed (grade = 'F')
    Also considers level, prerequisites, and existing enrollment.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Step 1: Get student information
        cursor.execute("""
            SELECT s.s_level, s.s_id 
            FROM student s
            WHERE s.s_id = ?
        """, (student_id,))
        student_data = cursor.fetchone()
        if not student_data:
            return {"error": "Student not found"}
        
        student_level, student_code = student_data

        # Step 2: Get student's course history from both systems
        # From main database (current enrollments)
        cursor.execute("""
            SELECT e.c_code, e.s_grade
            FROM enrolled_in e
            WHERE e.s_id = ?
        """, (student_id,))
        db_courses = {row[0]: row[1] for row in cursor.fetchall()}

        # From temporary Excel data (historical grades)
        cursor.execute("""
            SELECT courseid, gradeletter
            FROM temp_student_grades
            WHERE student_code = ?
        """, (student_code,))
        excel_courses = {row[0]: row[1] for row in cursor.fetchall()}

        # Combine both sources (Excel data overrides DB)
        all_attempted_courses = {**db_courses, **excel_courses}

        # Step 3: Identify courses the student has passed (grade > 'F')
        passed_courses = {
            course for course, grade in all_attempted_courses.items() 
            if grade and grade.upper() != 'F'
        }

        # Step 4: Get all courses from catalog
        cursor.execute("SELECT c_code, c_name FROM course")
        all_courses = cursor.fetchall()

        eligible_courses = []

        for course_code, course_name in all_courses:
            # Skip courses the student has already passed
            if course_code in passed_courses:
                continue

            # Step 5: Check course level restriction
            course_level = None
            if len(course_code) >= 3 and course_code[2].isdigit():
                course_level = int(course_code[2])
            elif len(course_code) >= 4 and course_code[3].isdigit():
                course_level = int(course_code[3])
            
            if course_level and course_level > student_level:
                continue

            # Step 6: Check prerequisites
            cursor.execute("""
                SELECT c_preCourse
                FROM prerequisite
                WHERE c_code = ?
            """, (course_code,))
            prerequisites = [row[0] for row in cursor.fetchall()]

            # Verify prerequisites were passed (not failed)
            missing_prereqs = [
                pre for pre in prerequisites 
                if pre not in passed_courses
            ]
            if missing_prereqs:
                continue

            # Step 7: Check current enrollment status
            currently_enrolled = course_code in db_courses

            # Step 8: Check if previously failed
            previously_failed = (
                course_code in all_attempted_courses and 
                (all_attempted_courses[course_code] != None and all_attempted_courses[course_code].upper() == 'F')
            )

            # Step 9: Get instructor information
            cursor.execute("""
                SELECT se_instructor
                FROM session
                WHERE c_code = ?
                LIMIT 1
            """, (course_code,))
            instructor = cursor.fetchone()
            instructor_name = instructor[0] if instructor else "Not assigned"

            eligible_courses.append({
                "course_code": course_code,
                "course_name": course_name,
                "instructor": instructor_name,
                "enrolled": currently_enrolled,
                "previously_failed": previously_failed,
                "meets_prerequisites": True,
                "appropriate_level": True
            })

        conn.close()
        return eligible_courses

    except Exception as e:
        return {"error": f"Error while fetching eligible courses: {str(e)}"}
    
# Function to fetch enrolled courses for a student
def get_enrolled_courses(student_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT c.c_code, c.c_name, e.se_semester
            FROM enrolled_in e
            JOIN course c ON e.c_code = c.c_code
            WHERE e.s_id = ?
            """,
            (student_id,),
        )
        courses = cursor.fetchall()
        conn.close()
        return [{"course_code": c[0], "course_name": c[1], "semester": c[2]} for c in courses]
    except Exception as e:
        return {"error": f"Error while fetching enrolled courses: {e}"}




def unenrolled_course(student_id, course_code):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            DELETE from enrolled_in
            WHERE s_id = ? AND c_code = ?
            """,
            (student_id, course_code),
        )
        conn.commit()
        conn.close()
        return {"success":True}
    except Exception as e:
        return {"error": f"Error while fetching enrolled courses: {e}"}

# #########################################
# #########################################
# #########################################
# #########################################

import json
import sqlite3
import time
import logging

logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

def enable_wal_mode(db_path):
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA journal_mode=WAL")
    conn.close()

def execute_with_retry(cursor, query, params, max_retries=5, delay=0.5):
    for attempt in range(max_retries):
        try:
            cursor.execute(query, params)
            return
        except sqlite3.OperationalError as e:
            if "database is locked" in str(e):
                logging.warning(f"Database locked, retrying ({attempt + 1}/{max_retries})...")
                time.sleep(delay)  # Wait and retry
            else:
                raise e
    raise sqlite3.OperationalError("Database is locked after multiple retries")

def accepted_schedule(student_id, schedule_schema):
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Parse schedule_schema as a JSON string into a Python list
        try:
            new_schedule_sessions = json.loads(schedule_schema)
            print(f"Parsed schedule_schema: {new_schedule_sessions}")
        except json.JSONDecodeError as e:
            return {"error": f"Invalid JSON format in schedule_schema: {e}"}

        # Validate session format
        valid_sessions = [session for session in new_schedule_sessions if len(session) == 7]
        invalid_sessions = [session for session in new_schedule_sessions if len(session) != 7]

        if invalid_sessions:
            print(f"⚠️ Found invalid sessions: {invalid_sessions}")

        if not valid_sessions:
            return {"error": "No valid sessions found in schedule_schema."}

        # Check for time conflicts within the valid sessions
        conflicts = set()
        for i, session_a in enumerate(valid_sessions):
            day_a, start_a, end_a, course_a = session_a[0], session_a[1], session_a[2], session_a[6]

            for j, session_b in enumerate(valid_sessions):
                if i >= j:  # Avoid redundant comparisons
                    continue

                day_b, start_b, end_b, course_b = session_b[0], session_b[1], session_b[2], session_b[6]

                if day_a == day_b and not (end_a <= start_b or start_a >= end_b):
                    conflict_pair = tuple(sorted([course_a, course_b]))  # Sort to avoid duplicates
                    conflicts.add((day_a, start_a, end_a, conflict_pair[0], conflict_pair[1]))

        conflict_list = [
            {
                "day": day,
                "start_time": start_time,
                "end_time": end_time,
                "new_course": course1,
                "conflicting_course": course2
            }
            for day, start_time, end_time, course1, course2 in conflicts
        ]

        # Stop execution if there are conflicts
        if conflict_list:
            return {
                "error": "Time conflict detected!",
                "conflicts": conflict_list,
                "schedule": None
            }

        # Insert student schedule (if no conflicts)
        execute_with_retry(
            cursor,
            "INSERT INTO student_schedule (s_id, schedule_schema) VALUES (?, ?)",
            (student_id, json.dumps(valid_sessions))
        )

        # Reduce capacity for each accepted session
        for session in valid_sessions:
            session_code = session[6]  
            session_day = session[0]
            session_time = session[1]

            execute_with_retry(
                cursor,
                "UPDATE session SET se_capacity = se_capacity - 1 WHERE c_code = ? AND se_day = ? AND se_stime = ? AND se_capacity > 0",
                (session_code, session_day, session_time)
            )

        conn.commit()

        # Return success message and the saved schedule
        return {
            "message": "Student schedule registered and session capacity updated successfully!",
            "schedule": valid_sessions  # Return the saved schedule
        }

    except Exception as e:
        if conn:
            conn.rollback()
        return {"error": f"Error while accepting schedule: {e}"}
    finally:
        if conn:
            conn.close()

def student_schedule(student_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT * FROM student_schedule
            WHERE s_id = ?
            ORDER BY rowid DESC LIMIT 1
            """,
            (student_id,)
        )

        student_schedule = cursor.fetchone()
        conn.close()

        if student_schedule is None:
            return {"schedule": {}, "message": "No schedule found for this student."}

        # Assuming the second column is the JSON schedule (adjust index if needed)
        raw_schedule = student_schedule[1]  # The second element of the tuple is the stored JSON string
        
        # Convert JSON string into Python dictionary
        try:
            parsed_schedule = json.loads(raw_schedule)
        except json.JSONDecodeError:
            return {"schedule": {}, "error": "Schedule data is corrupted."}

        return {"schedule": parsed_schedule}  # Correctly formatted response

    except Exception as e:
        return {"schedule": {}, "error": f"Error while retrieving student schedule: {e}"}




# Objective function for MEALPY optimization
def objective_function(solution):
    # Define an objective function that minimizes scheduling conflicts
    # Example: Summing solution values as a placeholder logic
    return sum(solution)

def fetch_non_overlapping_sessions(courses):
    """
    Fetch sessions for given courses and ensure no overlapping times.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Step 1: Fetch all sessions for the given courses
        cursor.execute(
            """
            SELECT se_id, c_code, se_day, se_stime, se_etime, group_name, se_instructor, se_type
            FROM session
            WHERE c_code IN ({','.join(['?' for _ in courses])})
            """.format(",".join(["?"] * len(courses))), courses),

        all_sessions = cursor.fetchall()

        # Step 2: Group sessions by day
        sessions_by_day = {}
        for session in all_sessions:
            se_day = session[2]  # Day column
            if se_day not in sessions_by_day:
                sessions_by_day[se_day] = []
            sessions_by_day[se_day].append(session)

        # Step 3: Filter non-overlapping sessions for each day
        non_overlapping_sessions = []
        for day, sessions in sessions_by_day.items():
            # Sort by start time for easier comparison
            sessions.sort(key=lambda x: x[3])  # Sort by `se_stime`

            # Add sessions ensuring no overlap
            selected_sessions = []
            for session in sessions:
                if not selected_sessions:
                    selected_sessions.append(session)
                else:
                    # Compare end time of the last selected session with the start time of the current session
                    last_session = selected_sessions[-1]
                    if last_session[4] <= session[3]:  # Compare `se_etime` <= `se_stime`
                        selected_sessions.append(session)

            non_overlapping_sessions.extend(selected_sessions)

        conn.close()
        return non_overlapping_sessions

    except Exception as e:
        return {"error": f"Error fetching non-overlapping sessions: {e}"}





# def generate_schedule(s_id, algorithm="GA", epoch=100, pop_size=50, schedule_option="min_days"):
#     """
#     Generate a schedule using optimization algorithms (GA/PSO), allowing for either
#     minimizing the total number of days, minimizing total slots, or minimizing slots per day.
#     The function first tries with GA; if the student rejects the GA schedule, it switches to PSO.
#     """
#     try:
#         if schedule_option not in ["min_days", "min_slots", "min_slots_per_day"]:
#             return {"error": "Invalid schedule_option. Choose 'min_days', 'min_slots', or 'min_slots_per_day'."}

#         print(f"Starting schedule generation for student {s_id} using {algorithm} with epoch={epoch}, pop_size={pop_size}, and option={schedule_option}")

#         # Step 1: Fetch enrolled courses
#         conn = get_db_connection()
#         cursor = conn.cursor()
#         cursor.execute("""
#             SELECT e.c_code, c.c_name
#             FROM enrolled_in e
#             JOIN course c ON e.c_code = c.c_code
#             WHERE e.s_id = ?
#         """, (s_id,))
#         enrolled_courses = cursor.fetchall()

#         if not enrolled_courses:
#             conn.close()
#             return {
#                 "debug": "Step 1 complete - No enrolled courses",
#                 "enrolled_courses": [],
#             }

#         # Step 2: Fetch grouped unique sessions for the enrolled courses
#         all_sessions = []
#         course_ids = [course[0] for course in enrolled_courses]

#         for c_code in course_ids:
#             cursor.execute("""
#                 SELECT DISTINCT se_day, se_stime, se_etime, se_room, se_instructor, se_type, c_code
#                 FROM session
#                 WHERE c_code = ?
#             """, (c_code,))
#             all_sessions.extend(cursor.fetchall())

#         if not all_sessions:
#             conn.close()
#             return {
#                 "debug": "Step 2 complete - No sessions available",
#                 "enrolled_courses": enrolled_courses,
#                 "all_sessions": [],
#             }

#         # Step 3: Filter sessions into labs and lectures
#         filtered_sessions = {}
#         for session in all_sessions:
#             session_type = session[5]  # "Lecture" or "Lab"
#             course_code = session[6]
#             if course_code not in filtered_sessions:
#                 filtered_sessions[course_code] = {"Lab": None, "Lecture": None}
#             if session_type == "Lab" and filtered_sessions[course_code]["Lab"] is None:
#                 filtered_sessions[course_code]["Lab"] = session
#             elif session_type == "Lecture" and filtered_sessions[course_code]["Lecture"] is None:
#                 filtered_sessions[course_code]["Lecture"] = session

#         # Step 4: Define the objective function based on the selected option
#         def objective_function(solution):
#             try:
#                 selected_sessions = []

#                 # Iterate over the flat solution array and map to filtered sessions
#                 for i, value in enumerate(solution):
#                     if value > 0.5:  # Binary decision: 1 means selected
#                         session = all_sessions[i]
#                         selected_sessions.append(session)

#                 if schedule_option == "min_days":
#                     # Minimize the number of unique days
#                     unique_days = len(set(session[0] for session in selected_sessions))  # session[0] is se_day
#                     return unique_days

#                 elif schedule_option == "min_slots":
#                     # Minimize the number of total slots
#                     return len(selected_sessions)

#                 elif schedule_option == "min_slots_per_day":
#                     # Minimize the maximum slots per day
#                     slots_per_day = {}
#                     for session in selected_sessions:
#                         day = session[0]  # se_day
#                         slots_per_day[day] = slots_per_day.get(day, 0) + 1
#                     max_slots = max(slots_per_day.values()) if slots_per_day else 0
#                     return max_slots

#                 else:
#                     raise ValueError(f"Unsupported schedule_option: {schedule_option}")

#             except Exception as e:
#                 print(f"Error in objective function: {e}")
#                 raise

#         # Step 5: Solve the optimization problem
#         def solve_schedule(algorithm):
#             problem_size = len(all_sessions)
#             bounds = BinaryVar(problem_size)

#             problem_dict = {
#                 "bounds": bounds,
#                 "obj_func": objective_function,
#                 "minmax": "min",
#             }

#             if algorithm == "GA":
#                 model = BaseGA(epoch=epoch, pop_size=pop_size, pc=0.9, pm=0.05)
#             elif algorithm == "PSO":
#                 model = OriginalPSO(epoch=epoch, pop_size=pop_size, w=0.7, c1=1.5, c2=1.5)
#             else:
#                 conn.close()
#                 return {"error": f"Algorithm {algorithm} is not supported."}

#             # Run the optimization
#             best_result = model.solve(problem_dict)
#             best_solution = best_result.solution
#             best_fitness = best_result.target.fitness

#             # Ensure JSON serialization
#             if isinstance(best_solution, np.ndarray):
#                 best_solution = best_solution.tolist()

#             # Format the best solution to include one lab and one lecture per course
#             formatted_solution = []
#             for course_code, sessions in filtered_sessions.items():
#                 if sessions["Lab"]:
#                     formatted_solution.append(sessions["Lab"])
#                 if sessions["Lecture"]:
#                     formatted_solution.append(sessions["Lecture"])

#             return {
#                 "best_solution": formatted_solution,
#                 "best_fitness": best_fitness,
#             }

#         # First attempt with GA
#         ga_schedule = solve_schedule("GA")
#         print("GA Schedule generated.")

#         # Simulate student decision
#         student_accepts_ga = False  # Placeholder: Replace with actual student input logic
#         if student_accepts_ga:
#             conn.close()
#             return {
#                 "algorithm": "GA",
#                 "schedule": ga_schedule,
#             }

#         # If GA schedule is rejected, try PSO
#         pso_schedule = solve_schedule("PSO")
#         print("PSO Schedule generated.")

#         # Ensure schedules are distinct
#         if pso_schedule["best_solution"] == ga_schedule["best_solution"]:
#             print("Adjusting PSO schedule to ensure uniqueness...")
#             pso_schedule = solve_schedule("PSO")

#         print("", enrolled_courses)
#         # print("", all_sessions)
#         print("", filtered_sessions)
#         print("schedule option", schedule_option)
#         # print("", best_result)

#         conn.close()
#         return {
#             "algorithm": "PSO",
#             "schedule": pso_schedule,
#         }

#     except Exception as e:
#         error_message = traceback.format_exc()
#         print(f"Error: {error_message}")
#         return {"error": error_message}
import random
from collections import defaultdict

def solve_schedule(algorithm, all_sessions, conn):
    """
    Solve the schedule using the selected algorithm (GA or PSO) and return a valid session list.
    """
    if not all_sessions:
        print("⚠️ No sessions passed to scheduling algorithm.")
        return []

    print(f"✅ Solving schedule with {len(all_sessions)} sessions using {algorithm}")
    
    if algorithm == "GA":
        return genetic_algorithm(all_sessions)
    elif algorithm == "PSO":
        cursor = conn.cursor()  # Create a cursor locally
        return particle_swarm_optimization(all_sessions, cursor)  # Pass cursor instead of conn
    else:
        return all_sessions  # Default fallback

def tournament_selection(population, fitness_function, tournament_size=5):
    selected = random.sample(population, tournament_size)
    return min(selected, key=lambda s: fitness_function(s))

def dynamic_mutation_rate(generation, max_generations):
    return 0.1 * (1 - generation / max_generations)  # Decrease mutation rate over time

def genetic_algorithm(all_sessions):
    """
    Enhanced Genetic Algorithm (GA) for schedule optimization.
    """
    population_size = 100  # Increase from 50 to 100
    max_generations = 200  # Increase from 100 to 200
    tournament_size = 5
    elitism_count = 10  # Increase from 5 to 10

    # Initialize population with unique schedules
    population = []
    while len(population) < population_size:
        schedule = random.sample(all_sessions, len(all_sessions))
        if schedule not in population:  # Ensure uniqueness
            population.append(schedule)

    best_schedule = min(population, key=lambda s: fitness_function(s))

    for generation in range(max_generations):
        # Early stopping if conflict-free schedule is found
        if fitness_function(best_schedule) == 0:
            print(f"✅ Found conflict-free schedule in generation {generation}")
            return best_schedule

        # Selection
        new_population = population[:elitism_count]  # Elitism
        while len(new_population) < population_size:
            parent1 = tournament_selection(population, fitness_function, tournament_size)
            parent2 = tournament_selection(population, fitness_function, tournament_size)
            child = crossover(parent1, parent2)

            # Mutation
            if random.random() < dynamic_mutation_rate(generation, max_generations):
                mutate(child)

            if child not in new_population:  # Ensure uniqueness
                new_population.append(child)

        population = new_population
        best_schedule = min(population, key=lambda s: fitness_function(s))

    print("❌ Could not find a conflict-free schedule within the maximum generations.")
    return best_schedule  # Return the best schedule found

def particle_swarm_optimization(all_sessions, cursor):
    """
    Enhanced Particle Swarm Optimization (PSO) for schedule optimization.
    """
    num_particles = 50
    max_iterations = 100
    particles = [random.sample(all_sessions, len(all_sessions)) for _ in range(num_particles)]
    velocities = [[0] * len(all_sessions) for _ in range(num_particles)]  # Initialize velocities
    local_bests = particles.copy()  # Initialize local bests
    local_fitnesses = [fitness_function(p) for p in particles]  # Initialize local fitnesses
    best_particle = min(particles, key=lambda s: fitness_function(s))
    best_fitness = fitness_function(best_particle)

    for iteration in range(max_iterations):
        for i, particle in enumerate(particles):
            # Evaluate fitness
            fitness = fitness_function(particle)

            # Update local best
            if fitness < local_fitnesses[i]:
                local_bests[i] = particle
                local_fitnesses[i] = fitness

            # Update global best
            if fitness < best_fitness:
                best_particle = particle
                best_fitness = fitness

            # Update velocity and position
            for j in range(len(particle)):
                # Extract numerical values for velocity calculation
                particle_start_time = parse_time(particle[j][1])  # Assuming start time is at index 1
                local_best_start_time = parse_time(local_bests[i][j][1])
                global_best_start_time = parse_time(best_particle[j][1])

                # Update velocity (simple random adjustment)
                velocities[i][j] = (
                    0.5 * velocities[i][j] +
                    random.uniform(0, 1) * (local_best_start_time - particle_start_time) +
                    random.uniform(0, 1) * (global_best_start_time - particle_start_time)
                )

                # Update position
                if random.random() < 0.1:  # Introduce randomness
                    particle[j] = best_particle[j]  # Move towards the best solution

            # Resolve conflicts in the particle
            particle, _ = resolve_conflicts(particle, cursor)  # Pass cursor directly

        # Early stopping if conflict-free schedule is found
        if best_fitness == 0:
            print(f"✅ Found conflict-free schedule in iteration {iteration}")
            return best_particle

    print("❌ Could not find a conflict-free schedule within the maximum iterations.")
    return best_particle  # Return the best schedule found


def fitness_function(schedule):
    # Detect conflicts
    if has_conflicts(schedule):
        return float('inf')  # Infinite penalty for schedules with conflicts

    # Track the number of lectures, labs, tutorials, workshops, and projects for each course
    course_groups = defaultdict(lambda: {"lectures": defaultdict(int), "labs": 0, "tutorials": 0, "workshops": 0, "projects": 0})

    for session in schedule:
        course_code, se_type, group_name = session[6], session[5], session[3]
        if se_type.lower() == "lecture":
            course_groups[course_code]["lectures"][group_name] += 1
        elif se_type.lower() == "lab":
            course_groups[course_code]["labs"] += 1
        elif se_type.lower() == "tutorial":
            course_groups[course_code]["tutorials"] += 1
        elif se_type.lower() == "work_shop":
            course_groups[course_code]["workshops"] += 1
        elif se_type.lower() == "project":
            course_groups[course_code]["projects"] += 1  # Track projects

    # Calculate penalty for courses that don't meet the requirements
    constraint_penalty = calculate_constraint_penalty(course_groups)
    return constraint_penalty

def calculate_constraint_penalty(course_groups):
    special_courses = ["CS101x", "CS102x", "CS213", "CS232"]
    courses_with_only_lectures = ["MCOM102x", "MGT200x", "MTH90x"]
    constraint_penalty = 0

    for course, groups in course_groups.items():
        total_lectures = sum(groups["lectures"].values())

        # Handle courses with projects
        if groups["projects"] > 0:
            continue  # Skip penalty calculation for courses with projects

        if course in special_courses:
            # Special courses require 2 lectures, 1 lab, and 1 workshop
            if total_lectures != 2 or groups["labs"] != 1 or groups["workshops"] != 1:
                constraint_penalty += 10
        elif course in courses_with_only_lectures:
            # Courses with only lectures require 2 lectures
            if total_lectures != 2:
                constraint_penalty += 10
        else:
            # Other courses require 2 lectures and 1 lab (or tutorial/workshop if lab is not available)
            if total_lectures != 2:
                constraint_penalty += 10
            if groups["labs"] == 0:
                if groups["tutorials"] == 0 and groups["workshops"] == 0:
                    constraint_penalty += 10

        # Penalize if lectures are from different groups
        if len(groups["lectures"]) > 1:
            constraint_penalty += 20  # High penalty for lectures from different groups

    return constraint_penalty

def crossover(parent1, parent2):
    """
    Order-based crossover for schedules.
    """
    size = len(parent1)
    start, end = sorted(random.sample(range(size), 2))  # Select two random points
    child = [None] * size

    # Copy the segment from parent1 to the child
    child[start:end] = parent1[start:end]

    # Fill the remaining positions with sessions from parent2, avoiding duplicates
    remaining = [session for session in parent2 if session not in child]
    idx = 0
    for i in range(size):
        if child[i] is None:
            if idx < len(remaining):  # Ensure idx is within bounds
                child[i] = remaining[idx]
                idx += 1
            else:
                # If no more sessions are available, fill with a random session
                child[i] = random.choice(parent2)

    return child

def mutate(schedule):
    """
    Swap mutation for schedules.
    """
    idx1, idx2 = random.sample(range(len(schedule)), 2)
    schedule[idx1], schedule[idx2] = schedule[idx2], schedule[idx1]

def get_non_conflicting_groups(cursor, course_ids):
    valid_groups = defaultdict(list)

    for c_code in course_ids:
        # Fetch lectures
        cursor.execute("""
            SELECT se_day, se_stime, se_etime, group_name, se_instructor, se_type, c_code
            FROM session
            WHERE c_code = ? AND se_type = 'Lecture';
        """, (c_code,))
        lectures = cursor.fetchall()

        # Fetch labs, tutorials, workshops, and projects
        cursor.execute("""
            SELECT se_day, se_stime, se_etime, group_name, se_instructor, se_type, c_code
            FROM session
            WHERE c_code = ? AND se_type IN ('Lab', 'Tutorial', 'Work_Shop', 'Project');
        """, (c_code,))
        other_sessions = cursor.fetchall()

        # Group lectures by group name
        lecture_groups = defaultdict(list)
        for lecture in lectures:
            group_name = lecture[3]  # Assuming group name is at index 3
            lecture_groups[group_name].append(lecture)

        # Ensure each group has at least 2 lectures
        for group_name, group_lectures in lecture_groups.items():
            if len(group_lectures) >= 2:
                valid_groups[(c_code, "Lecture")].extend(group_lectures)

        # Add labs, tutorials, workshops, and projects
        valid_groups[(c_code, "Lab")].extend([s for s in other_sessions if s[5] == "Lab"])
        valid_groups[(c_code, "Tutorial")].extend([s for s in other_sessions if s[5] == "Tutorial"])
        valid_groups[(c_code, "Workshop")].extend([s for s in other_sessions if s[5] == "Work_Shop"])
        valid_groups[(c_code, "Project")].extend([s for s in other_sessions if s[5] == "Project"])  

    return valid_groups

def parse_time(time_str):
    """Convert a time string (e.g., '12:30') to a float representation (e.g., 12.5)."""
    hours, minutes = map(int, time_str.split(':'))
    return hours + minutes / 60


def has_conflicts(schedule):
    """
    Check for time conflicts within the schedule, including overlapping sessions for different courses.
    """
    conflicts = []
    occupied_slots = defaultdict(list)  # Track time slots for each day

    for session in schedule:
        day, start, end, group, instructor, se_type, course = session[:7]
        start_time = parse_time(start)
        end_time = parse_time(end)

        # Check for time conflicts with existing sessions on the same day
        for existing in occupied_slots[day]:
            ex_start, ex_end, ex_course = existing
            if not (end_time <= ex_start or start_time >= ex_end):
                conflicts.append((session, existing))
                break

        # Add the current session to the occupied slots
        occupied_slots[day].append((start_time, end_time, course))

    return conflicts

def find_alternative_group(course_code, day, start, end, cursor, occupied_slots, se_type, group):
    """
    Finds an alternative session for a course that does not conflict with the existing schedule.
    Ensures the alternative session is from the same group.
    """
    start_time = parse_time(start)
    end_time = parse_time(end)

    cursor.execute("""
        SELECT se_day, se_stime, se_etime, group_name, se_instructor, se_type, c_code 
        FROM session 
        WHERE c_code = ? AND se_day != ? AND se_type = ? AND group_name = ?;
    """, (course_code, day, se_type, group))  # Add group filter

    alternative_sessions = cursor.fetchall()

    for alt in alternative_sessions:
        alt_day, alt_start, alt_end, alt_group, alt_instructor, alt_type, alt_course = alt
        alt_start_time = parse_time(alt_start)
        alt_end_time = parse_time(alt_end)

        # Ensure the alternative session does not conflict with existing ones
        conflict_found = False
        for existing in occupied_slots[alt_day]:
            ex_start, ex_end, ex_course = existing
            if not (alt_end_time <= ex_start or alt_start_time >= ex_end):
                conflict_found = True
                break

        if not conflict_found:
            return alt  # Return the first non-conflicting alternative session

    return None  # No suitable alternative found

def find_alternative_group_from_any_group(course_code, day, start, end, cursor, occupied_slots, se_type):
    """
    Finds an alternative session for a course from any group that does not conflict with the existing schedule.
    """
    start_time = parse_time(start)
    end_time = parse_time(end)

    cursor.execute("""
        SELECT se_day, se_stime, se_etime, group_name, se_instructor, se_type, c_code 
        FROM session 
        WHERE c_code = ? AND se_day != ? AND se_type = ?;
    """, (course_code, day, se_type))  # No group filter

    alternative_sessions = cursor.fetchall()

    for alt in alternative_sessions:
        alt_day, alt_start, alt_end, alt_group, alt_instructor, alt_type, alt_course = alt
        alt_start_time = parse_time(alt_start)
        alt_end_time = parse_time(alt_end)

        # Ensure the alternative session does not conflict with existing ones
        conflict_found = False
        for existing in occupied_slots[alt_day]:
            ex_start, ex_end, ex_course = existing
            if not (alt_end_time <= ex_start or alt_start_time >= ex_end):
                conflict_found = True
                break

        if not conflict_found:
            return alt  # Return the first non-conflicting alternative session

    return None  # No suitable alternative found


import logging

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

def resolve_conflicts(all_sessions, cursor):
    max_attempts = 500  # Increase from 200 to 500
    for attempt in range(max_attempts):
        conflicts = has_conflicts(all_sessions)
        if not conflicts:
            logging.info("✅ Final schedule conflict-free")
            return all_sessions, None

        logging.info(f"⚠️ Attempt {attempt + 1}: Resolving {len(conflicts)} conflicts...")

        occupied_slots = defaultdict(list)
        filtered_sessions = []

        for session in all_sessions:
            day, start, end, group, instructor, se_type, course = session[:7]
            start_time = parse_time(start)
            end_time = parse_time(end)

            if not is_conflict(day, start_time, end_time, occupied_slots):
                occupied_slots[day].append((start_time, end_time, course))
                filtered_sessions.append(session)
            else:
                logging.debug(f"Conflict found for session: {session}")
                # Determine which course to replace based on priority
                conflicting_session = find_conflicting_session(session, all_sessions, occupied_slots)
                if conflicting_session:
                    # Replace the session with lower priority
                    if should_replace(session, conflicting_session):
                        logging.debug(f"Replacing session: {session}")
                        alternative_session = find_alternative_session(
                            course, day, start, end, cursor, occupied_slots, se_type, group
                        )
                        if alternative_session:
                            logging.debug(f"Found alternative session: {alternative_session}")
                            filtered_sessions.append(alternative_session)
                            occupied_slots[day].append((parse_time(alternative_session[1]), parse_time(alternative_session[2]), course))
                        else:
                            logging.debug(f"No alternative found for {course} in group {group}, trying another group...")
                            alternative_group_session = find_alternative_group_from_any_group(
                                course, day, start, end, cursor, occupied_slots, se_type
                            )
                            if alternative_group_session:
                                logging.debug(f"Found alternative session from another group: {alternative_group_session}")
                                filtered_sessions.append(alternative_group_session)
                                occupied_slots[day].append((parse_time(alternative_group_session[1]), parse_time(alternative_group_session[2]), course))
                            else:
                                logging.error(f"❌ No alternative found for {course} in any group, rejecting schedule.")
                                return all_sessions, f"Cannot generate a valid schedule due to conflicts for {course}."
                    else:
                        logging.debug(f"Replacing conflicting session: {conflicting_session}")
                        # Replace the conflicting session instead
                        alternative_session = find_alternative_session(
                            conflicting_session[6], conflicting_session[0], conflicting_session[1], conflicting_session[2], cursor, occupied_slots, conflicting_session[5], conflicting_session[3]
                        )
                        if alternative_session:
                            logging.debug(f"Found alternative session: {alternative_session}")
                            filtered_sessions.append(alternative_session)
                            occupied_slots[day].append((parse_time(alternative_session[1]), parse_time(alternative_session[2]), conflicting_session[6]))
                        else:
                            logging.error(f"❌ No alternative found for {conflicting_session[6]} in any group, rejecting schedule.")
                            return all_sessions, f"Cannot generate a valid schedule due to conflicts for {conflicting_session[6]}."
                else:
                    logging.error(f"❌ No conflicting session found, rejecting schedule.")
                    return all_sessions, "Cannot generate a valid schedule due to conflicts."

        all_sessions = filtered_sessions

    logging.error("❌ Reached max_attempts without resolving all conflicts.")
    return all_sessions, "Cannot generate a valid schedule due to conflicts."

def should_replace(session1, session2):
    """
    Determine which session to replace based on priority.
    """
    special_courses = ["CS101x", "CS102x", "CS213", "CS232"]
    courses_with_only_lectures = ["MCOM102x", "MGT200x", "MTH90x"]

    course1 = session1[6]
    course2 = session2[6]

    # Priority: Special courses > Other courses > Courses with only lectures
    if course1 in special_courses and course2 not in special_courses:
        return False  # Do not replace special course
    elif course2 in special_courses and course1 not in special_courses:
        return True  # Replace non-special course
    elif course1 in courses_with_only_lectures and course2 not in courses_with_only_lectures:
        return True  # Replace course with only lectures
    elif course2 in courses_with_only_lectures and course1 not in courses_with_only_lectures:
        return False  # Do not replace course with only lectures
    else:
        # Randomly decide if no clear priority
        return random.choice([True, False])

def find_conflicting_session(session, all_sessions, occupied_slots):
    """
    Find the session that conflicts with the given session.
    Returns the original session (with time strings) from all_sessions.
    """
    day, start, end, group, instructor, se_type, course = session[:7]
    start_time = parse_time(start)
    end_time = parse_time(end)

    for existing in occupied_slots[day]:
        ex_start, ex_end, ex_course = existing
        if not (end_time <= ex_start or start_time >= ex_end):
            # Find the original session in all_sessions
            for s in all_sessions:
                if (s[0] == day and parse_time(s[1]) == ex_start and parse_time(s[2]) == ex_end and s[6] == ex_course):
                    return s  # Return the original session

    return None  # No conflicting session found

def is_conflict(day, start_time, end_time, occupied_slots):
    for existing in occupied_slots[day]:
        ex_start, ex_end, ex_course = existing
        if not (end_time <= ex_start or start_time >= ex_end):
            return True
    return False

def find_alternative_session(course_code, day, start, end, cursor, occupied_slots, se_type, group=None):
    """
    Finds an alternative session for a course that does not conflict with the existing schedule.
    """
    start_time = parse_time(start)
    end_time = parse_time(end)

    query = """
        SELECT se_day, se_stime, se_etime, group_name, se_instructor, se_type, c_code 
        FROM session 
        WHERE c_code = ? AND se_type = ?
    """
    params = [course_code, se_type]

    if group:
        query += " AND group_name = ?"
        params.append(group)

    cursor.execute(query, params)
    alternative_sessions = cursor.fetchall()

    for alt in alternative_sessions:
        alt_day, alt_start, alt_end, alt_group, alt_instructor, alt_type, alt_course = alt
        alt_start_time = parse_time(alt_start)
        alt_end_time = parse_time(alt_end)

        if not is_conflict(alt_day, alt_start_time, alt_end_time, occupied_slots):
            return alt  # Return the first non-conflicting alternative session

    return None  # No suitable alternative found

def generate_schedule(s_id, algorithm="GA", epoch=500, pop_size=200, schedule_option="min_days", max_attempts=50, preferred_instructor=None):
    try:
        print(f"🎯 Generating schedule for student {s_id} using {algorithm}")
        if preferred_instructor:
            print(f"⭐ Trying to prioritize instructor: {preferred_instructor}")

        conn = get_db_connection()
        cursor = conn.cursor()

        # Fetch enrolled courses
        enrolled_courses = fetch_enrolled_courses(cursor, s_id)
        if not enrolled_courses:
            conn.close()
            return {"debug": "No enrolled courses", "enrolled_courses": []}

        course_ids = [course[0] for course in enrolled_courses]
        non_conflicting_groups = get_non_conflicting_groups(cursor, course_ids)

        # Modified session selection with instructor preference
        if preferred_instructor:
            print(f"⭐ Trying to prioritize instructors: {preferred_instructor}")
            preferred_sessions = select_sessions_with_instructor_preference(
                course_ids, non_conflicting_groups, preferred_instructor)
            
            if preferred_sessions:
                print(f"📌 Found {len(preferred_sessions)} sessions with preferred instructor")
                resolved_sessions, error_msg = resolve_conflicts(preferred_sessions, cursor)
                if resolved_sessions:
                    all_sessions = resolved_sessions
                    print("✅ Successfully scheduled with preferred instructor")
                else:
                    print("⚠️ Couldn't resolve conflicts with preferred instructor, falling back...")
                    all_sessions = select_sessions(course_ids, non_conflicting_groups)
            else:
                print("⚠️ No sessions found with preferred instructor, falling back...")
                all_sessions = select_sessions(course_ids, non_conflicting_groups)
        else:
            # Original selection logic
            all_sessions = select_sessions(course_ids, non_conflicting_groups)

        if not all_sessions:
            conn.close()
            return {"error": "No valid sessions found for the enrolled courses"}

        print(f"📌 Total selected sessions before conflict resolution: {len(all_sessions)}")
        
        all_sessions, error_message = resolve_conflicts(all_sessions, cursor)
        if not all_sessions:
            print("⚠️ Falling back to backtracking...")
            if all_sessions is not None:
                all_sessions = backtrack_schedule(all_sessions, cursor)
                if not all_sessions:
                    conn.close()
                    return {"error": "Cannot generate a valid schedule due to conflicts."}
            else:
                conn.close()
                return {"error": "Cannot generate a valid schedule due to conflicts."}

        if algorithm == "compare":
            comparison_stats = compare_algorithms(all_sessions, conn)
            print_comparison_results(comparison_stats)
            conn.close()
            return {"comparison_results": comparison_stats}
        else:
            result = solve_schedule(algorithm, all_sessions, conn)
            conn.close()
            return result

    except Exception as e:
        error_message = traceback.format_exc()
        print(f"❌ Error: {error_message}")
        if conn:
            conn.close()
        return {"error": error_message}


def select_sessions_with_instructor_preference(course_ids, non_conflicting_groups, preferred_instructor):
    """
    Select sessions prioritizing the preferred instructor, but include alternatives if needed.
    Returns a list of sessions that tries to maximize use of the preferred instructor
    while maintaining the required session counts for each course.
    """
    all_sessions = []
    special_courses = ["CS101x", "CS102x", "CS213", "CS232"]
    courses_with_only_lectures = ["MCOM102x", "MGT200x", "MTH90x"]

    for c_code in course_ids:
        # First try to get sessions with preferred instructor
        def filter_by_instructor(sessions):
            preferred = [s for s in sessions if s[4] in preferred_instructor]
            return preferred if preferred else sessions  # Fallback to all if none match

        lectures = filter_by_instructor(non_conflicting_groups.get((c_code, "Lecture"), []))
        labs = filter_by_instructor(non_conflicting_groups.get((c_code, "Lab"), []))
        tutorials = filter_by_instructor(non_conflicting_groups.get((c_code, "Tutorial"), []))
        workshops = filter_by_instructor(non_conflicting_groups.get((c_code, "Workshop"), []))
        projects = filter_by_instructor(non_conflicting_groups.get((c_code, "Project"), []))

        if not lectures and not projects:
            print(f"⚠️ No lectures or projects found for {c_code} (even with fallback)")
            return None

        # Group lectures by group name
        lecture_groups = defaultdict(list)
        for lecture in lectures:
            group_name = lecture[3]  # group_name at index 3
            lecture_groups[group_name].append(lecture)

        selected_lectures = []
        selected_lab = None
        selected_workshop = None
        selected_project = None

        # Handle courses with projects
        if projects:
            selected_project = random.choice(projects)
            all_sessions.append(selected_project)
            continue

        # Handle courses without projects
        for group_name, group_lectures in lecture_groups.items():
            if len(group_lectures) >= 2:
                selected_lectures = group_lectures[:2]  # Take first two lectures

                if c_code in special_courses:
                    # Special courses need 2 lectures, 1 lab, 1 workshop
                    if labs:
                        selected_lab = random.choice(labs)
                    else:
                        print(f"⚠️ No lab found for {c_code} (even with fallback)")
                        return None

                    if workshops:
                        selected_workshop = random.choice(workshops)
                    else:
                        print(f"⚠️ No workshop found for {c_code} (even with fallback)")
                        return None

                    all_sessions.extend(selected_lectures + [selected_lab, selected_workshop])
                    break
                elif c_code in courses_with_only_lectures:
                    # Only need 2 lectures
                    all_sessions.extend(selected_lectures)
                    break
                else:
                    # Regular courses need 2 lectures + 1 lab (or tutorial/workshop)
                    if labs:
                        selected_lab = random.choice(labs)
                    elif tutorials:
                        selected_lab = random.choice(tutorials)
                    elif workshops:
                        selected_lab = random.choice(workshops)
                    else:
                        print(f"⚠️ No lab/tutorial/workshop found for {c_code} (even with fallback)")
                        return None

                    all_sessions.extend(selected_lectures + [selected_lab])
                    break
        else:
            print(f"⚠️ No group has 2 lectures for {c_code} (even with fallback)")
            return None

    return all_sessions            

def fetch_enrolled_courses(cursor, s_id):
    cursor.execute("""
        SELECT e.c_code, c.c_name
        FROM enrolled_in e
        JOIN course c ON e.c_code = c.c_code
        WHERE e.s_id = ? AND e.se_semester = ?
    """, (str(s_id), SEMESTER))
    return cursor.fetchall()

def select_sessions(course_ids, non_conflicting_groups):
    all_sessions = []
    special_courses = ["CS101x", "CS102x", "CS213", "CS232"]  # Special courses
    courses_with_only_lectures = ["MCOM102x", "MGT200x", "MTH90x"]  # Courses with only lectures

    for c_code in course_ids:
        lectures = non_conflicting_groups.get((c_code, "Lecture"), [])
        labs = non_conflicting_groups.get((c_code, "Lab"), [])
        tutorials = non_conflicting_groups.get((c_code, "Tutorial"), [])
        workshops = non_conflicting_groups.get((c_code, "Workshop"), [])
        projects = non_conflicting_groups.get((c_code, "Project"), [])  # Add projects

        if not lectures and not projects:  # Skip if no lectures or projects are available
            print(f"❌ No lectures or projects found for {c_code}")
            return None

        lecture_groups = defaultdict(list)
        for lecture in lectures:
            group_name = lecture[3]  # Assuming group name is at index 3
            lecture_groups[group_name].append(lecture)

        selected_lectures = []
        selected_lab = None
        selected_workshop = None
        selected_project = None

        # Handle courses with projects
        if projects:
            selected_project = random.choice(projects)  # Select a random project session
            all_sessions.append(selected_project)
            continue  # Skip the rest of the logic for this course

        # Handle courses without projects
        for group_name, group_lectures in lecture_groups.items():
            if len(group_lectures) >= 2:
                selected_lectures = group_lectures[:2]

                if c_code in special_courses:
                    # Special courses require 2 lectures, 1 lab, and 1 workshop
                    if labs:
                        selected_lab = random.choice(labs)
                    else:
                        print(f"❌ No lab found for {c_code}")
                        return None

                    if workshops:
                        selected_workshop = random.choice(workshops)
                    else:
                        print(f"❌ No workshop found for {c_code}")
                        return None

                    all_sessions.extend(selected_lectures + [selected_lab, selected_workshop])
                    break
                elif c_code in courses_with_only_lectures:
                    # Courses with only lectures require 2 lectures
                    all_sessions.extend(selected_lectures)
                    break
                else:
                    # Other courses require 2 lectures and 1 lab (or tutorial/workshop if lab is not available)
                    if labs:
                        selected_lab = random.choice(labs)
                    elif tutorials:
                        selected_lab = random.choice(tutorials)
                    elif workshops:
                        selected_lab = random.choice(workshops)
                    else:
                        print(f"❌ No lab, tutorial, or workshop found for {c_code}")
                        return None

                    all_sessions.extend(selected_lectures + [selected_lab])
                    break
        else:
            print(f"❌ No group has 2 lectures for {c_code}")
            return None

    return all_sessions


def backtrack_schedule(all_sessions, cursor, occupied_slots=None, index=0):
    """
    Backtracking algorithm to find a conflict-free schedule.
    """
    if occupied_slots is None:
        occupied_slots = defaultdict(list)

    if index >= len(all_sessions):
        return all_sessions  # Success: conflict-free schedule found

    session = all_sessions[index]
    day, start, end, group, instructor, se_type, course = session[:7]
    start_time = parse_time(start)
    end_time = parse_time(end)

    # Check if the session conflicts with existing ones
    if not is_conflict(day, start_time, end_time, occupied_slots):
        # Add the session to the schedule
        occupied_slots[day].append((start_time, end_time, course))
        result = backtrack_schedule(all_sessions, cursor, occupied_slots, index + 1)
        if result:
            return result  # Success: conflict-free schedule found
        # Backtrack: remove the session from the schedule
        occupied_slots[day].pop()

    # Try alternative sessions for the current course
    alternative_sessions = find_all_alternatives(course, day, start, end, cursor, occupied_slots, se_type, group)
    for alt in alternative_sessions:
        all_sessions[index] = alt  # Replace the session with an alternative
        result = backtrack_schedule(all_sessions, cursor, occupied_slots, index + 1)
        if result:
            return result  # Success: conflict-free schedule found

    return None  # Failure: no conflict-free schedule found

def find_all_alternatives(course_code, day, start, end, cursor, occupied_slots, se_type, group=None):
    """
    Finds all alternative sessions for a course that do not conflict with the existing schedule.
    """
    start_time = parse_time(start)
    end_time = parse_time(end)

    query = """
        SELECT se_day, se_stime, se_etime, group_name, se_instructor, se_type, c_code 
        FROM session 
        WHERE c_code = ? AND se_type = ?
    """
    params = [course_code, se_type]

    if group:
        query += " AND group_name = ?"
        params.append(group)

    cursor.execute(query, params)
    alternative_sessions = cursor.fetchall()

    non_conflicting_alternatives = []
    for alt in alternative_sessions:
        alt_day, alt_start, alt_end, alt_group, alt_instructor, alt_type, alt_course = alt
        alt_start_time = parse_time(alt_start)
        alt_end_time = parse_time(alt_end)

        if not is_conflict(alt_day, alt_start_time, alt_end_time, occupied_slots):
            non_conflicting_alternatives.append(alt)

    return non_conflicting_alternatives


import math
import time
from decimal import Decimal, getcontext

def compare_algorithms(all_sessions, conn, num_runs=10):
    # Set higher precision for decimal calculations
    getcontext().prec = 8
    
    def validate_fitness(fitness):
        """Ensure fitness is a finite number, replace invalid values with large number"""
        if fitness is None or math.isinf(fitness) or math.isnan(fitness):
            return Decimal('1e10')  # Large penalty value instead of infinity
        try:
            return Decimal(str(fitness))
        except:
            return Decimal('1e10')
    
    def calculate_stats(values, total_runs):
        """Calculate all statistics with guaranteed finite values"""
        if not values:
            return {
                'average': Decimal('1e10'),
                'min': Decimal('1e10'),
                'max': Decimal('1e10'),
                'success_count': 0,
                'success_rate': Decimal('0.0'),
                'std_dev': Decimal('0.0'),
                'median': Decimal('1e10')
            }
        
        valid_values = [validate_fitness(v) for v in values]
        success_count = sum(1 for v in valid_values if v == 0)
        
        # Calculate average
        try:
            avg = sum(valid_values) / Decimal(len(valid_values))
        except:
            avg = Decimal('1e10')
        
        # Calculate standard deviation
        std_dev = Decimal('0.0')
        if len(valid_values) > 1:
            try:
                sum_sq = sum((x - avg) ** 2 for x in valid_values)
                variance = sum_sq / Decimal(len(valid_values))
                std_dev = variance.sqrt()
            except:
                std_dev = Decimal('0.0')
        
        # Calculate median
        try:
            sorted_values = sorted(valid_values)
            mid = len(sorted_values) // 2
            if len(sorted_values) % 2 == 0:
                median = (sorted_values[mid - 1] + sorted_values[mid]) / Decimal('2.0')
            else:
                median = sorted_values[mid]
        except:
            median = Decimal('1e10')
        
        return {
            'average': avg,
            'min': min(valid_values, default=Decimal('1e10')),
            'max': max(valid_values, default=Decimal('1e10')),
            'success_count': success_count,
            'success_rate': (Decimal(success_count) / Decimal(total_runs)) * Decimal('100.0') if total_runs > 0 else Decimal('0.0'),
            'std_dev': std_dev,
            'median': median
        }

    # Initialize results structure
    results = {
        'GA': {'fitness_values': [], 'execution_times': []},
        'PSO': {'fitness_values': [], 'execution_times': []},
        'total_runs': num_runs
    }

    cursor = conn.cursor()
    
    for run in range(num_runs):
        # Run Genetic Algorithm
        try:
            start_time = time.perf_counter()
            ga_schedule = genetic_algorithm(all_sessions)
            ga_time = Decimal(str(time.perf_counter() - start_time))
            
            if ga_schedule is not None:
                ga_fitness = validate_fitness(fitness_function(ga_schedule))
                results['GA']['fitness_values'].append(ga_fitness)
                results['GA']['execution_times'].append(ga_time)
        except Exception as e:
            print(f"GA Run {run + 1} failed: {str(e)}")
            results['GA']['fitness_values'].append(Decimal('1e10'))
            results['GA']['execution_times'].append(Decimal('0.0'))
        
        # Run Particle Swarm Optimization
        try:
            start_time = time.perf_counter()
            pso_schedule = particle_swarm_optimization(all_sessions, cursor)
            pso_time = Decimal(str(time.perf_counter() - start_time))
            
            if pso_schedule is not None:
                pso_fitness = validate_fitness(fitness_function(pso_schedule))
                results['PSO']['fitness_values'].append(pso_fitness)
                results['PSO']['execution_times'].append(pso_time)
        except Exception as e:
            print(f"PSO Run {run + 1} failed: {str(e)}")
            results['PSO']['fitness_values'].append(Decimal('1e10'))
            results['PSO']['execution_times'].append(Decimal('0.0'))
    
    # Calculate final statistics
    for algo in ['GA', 'PSO']:
        fitness_stats = calculate_stats(results[algo]['fitness_values'], num_runs)
        time_stats = calculate_stats(results[algo]['execution_times'], num_runs)
        
        results[algo].update({
            'average_fitness': float(fitness_stats['average']),
            'min_fitness': float(fitness_stats['min']),
            'max_fitness': float(fitness_stats['max']),
            'success_count': int(fitness_stats['success_count']),
            'success_rate': float(fitness_stats['success_rate']),
            'fitness_std_dev': float(fitness_stats['std_dev']),
            'fitness_median': float(fitness_stats['median']),
            'average_time': float(time_stats['average']),
            'min_time': float(time_stats['min']),
            'max_time': float(time_stats['max']),
            'time_std_dev': float(time_stats['std_dev']),
            'time_median': float(time_stats['median'])
        })
    
    # Enhanced comparison
    def get_comparison_data(algo):
        return (
            results[algo]['success_rate'],
            -results[algo]['average_fitness'],
            -results[algo]['fitness_median'],
            -results[algo]['fitness_std_dev'],
            -results[algo]['average_time'],
            -results[algo]['time_median']
        )
    
    ga_score = get_comparison_data('GA')
    pso_score = get_comparison_data('PSO')
    
    results['better_algorithm'] = 'GA' if ga_score > pso_score else 'PSO'
    results['comparison_metrics'] = {
        'success_rate_diff': results['GA']['success_rate'] - results['PSO']['success_rate'],
        'avg_fitness_diff': results['GA']['average_fitness'] - results['PSO']['average_fitness'],
        'median_fitness_diff': results['GA']['fitness_median'] - results['PSO']['fitness_median'],
        'avg_time_diff': results['GA']['average_time'] - results['PSO']['average_time'],
        'median_time_diff': results['GA']['time_median'] - results['PSO']['time_median']
    }
    
    return results


def print_comparison_results(stats):
    """Print detailed and formatted comparison results with all metrics."""
    
    def format_value(value, is_time=False):
        """Format numeric values, showing actual large numbers"""
        if value is None:
            return "Missing"
        if isinstance(value, (int, float)):
            if is_time:
                return f"{value:.6f}"
            return f"{value:.8f}"
        return str(value)
    
    # Header
    print("\n" + "="*80)
    print("ALGORITHM COMPARISON RESULTS".center(80))
    print("="*80)
    
    # Print metrics for each algorithm
    for algo in ['GA', 'PSO']:
        print("\n" + f" {algo} PERFORMANCE ".center(80, "-"))
        
        # Fitness metrics
        print("\nFITNESS METRICS:")
        print(f"  Average:       {format_value(stats[algo].get('average_fitness'))}")
        print(f"  Median:        {format_value(stats[algo].get('fitness_median'))}")
        print(f"  Std Dev:       {format_value(stats[algo].get('fitness_std_dev'))}")
        print(f"  Range:         {format_value(stats[algo].get('min_fitness'))} to {format_value(stats[algo].get('max_fitness'))}")
        print(f"  Success Rate:  {stats[algo].get('success_rate', 0):.2f}% ({stats[algo].get('success_count', 0)}/{stats.get('total_runs', 0)})")
        
        # Time metrics
        print("\nTIME METRICS (seconds):")
        print(f"  Average:       {format_value(stats[algo].get('average_time'), True)}")
        print(f"  Median:        {format_value(stats[algo].get('time_median'), True)}")
        print(f"  Std Dev:       {format_value(stats[algo].get('time_std_dev'), True)}")
        print(f"  Range:         {format_value(stats[algo].get('min_time'), True)} to {format_value(stats[algo].get('max_time'), True)}")
    
    # Detailed comparison with explanation
    print("\n" + " COMPARISON SUMMARY ".center(80, "="))
    better_algo = stats.get('better_algorithm', 'N/A')
    print(f"\nBetter Algorithm: {better_algo}")
    
    if better_algo != 'N/A':
        print("\nREASON FOR DECISION:")
        ga_fitness = stats['GA'].get('average_fitness', float('inf'))
        pso_fitness = stats['PSO'].get('average_fitness', float('inf'))
        
        if stats['GA']['success_rate'] != stats['PSO']['success_rate']:
            print("- Decided based on success rate (higher is better)")
        elif ga_fitness != pso_fitness:
            print("- Decided based on fitness score (lower is better)")
            print(f"- GA fitness: {ga_fitness:.8f}")
            print(f"- PSO fitness: {pso_fitness:.8f}")
        else:
            print("- Decided based on execution time (faster is better)")
    
    # Show differences between algorithms
    if 'comparison_metrics' in stats:
        print("\nKEY DIFFERENCES:")
        cm = stats['comparison_metrics']
        print(f"  Success Rate:   GA {cm.get('success_rate_diff', 0):+.2f}%")
        print(f"  Avg Fitness:    GA {cm.get('avg_fitness_diff', 0):+.8f}")
        print(f"  Median Fitness: GA {cm.get('median_fitness_diff', 0):+.8f}")
        print(f"  Avg Time:       GA {cm.get('avg_time_diff', 0):+.6f}s")
        print(f"  Median Time:    GA {cm.get('median_time_diff', 0):+.6f}s")
    
    # Footer
    print("\n" + "="*80)
    print(f"Total runs per algorithm: {stats.get('total_runs', 0)}")
    print("="*80)

def get_student_instructors(student_id):
    """
    Get distinct instructors for a student's enrolled courses
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Get enrolled courses for current semester
        cursor.execute("""
            SELECT e.c_code
            FROM enrolled_in e
            WHERE e.s_id = ? AND e.se_semester = ?
        """, (student_id, SEMESTER))
        
        enrolled_courses = [row[0] for row in cursor.fetchall()]
        if not enrolled_courses:
            return {"error": "No enrolled courses found for this student"}, 404

        # Get distinct instructors for these courses
        cursor.execute("""
            SELECT DISTINCT se_instructor, c_code, se_type
            FROM session
            WHERE c_code IN ({})
            AND se_instructor IS NOT NULL
            AND se_instructor != ''
            ORDER BY se_instructor
        """.format(','.join(['?']*len(enrolled_courses))), enrolled_courses)

        instructors = [
            {
                "value": row[0],
                "text": row[0],
                "course": row[1],
                "type": row[2]
            }
            for row in cursor.fetchall()
        ]
        conn.close()

        if not instructors:
            return {"error": "No instructors found for enrolled courses"}, 404

        return {"instructors": instructors}, 200

    except Exception as e:
        if conn:
            conn.close()
        return {"error": f"Database error: {str(e)}"}, 500
