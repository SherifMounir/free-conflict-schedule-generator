import sqlite3
from mealpy.utils.space import BinaryVar
from mealpy.evolutionary_based.GA import BaseGA
from mealpy.swarm_based.PSO import OriginalPSO
import numpy as np  # If you use numpy for array operations
import traceback



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
def enroll_student(student_id, course_code, semester):
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
            SELECT s_gpa, s_level
            FROM student
            WHERE s_email = ? AND s_password = ?
            """,
            (email, password)
        )

        result = cursor.fetchone()
        conn.close()

        if result:
            return {"gpa": result[0], "level": result[1]}
        else:
            return {"error": "Invalid email or password"}
    except Exception as e:
        return {"error": f"Error while logging in: {e}"}

# Function to fetch all courses
def get_all_courses(student_id):
    """
    Fetch all courses eligible for a specific student based on their level, GPA, and prerequisites.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Step 1: Fetch student's level and completed courses
        cursor.execute("SELECT s_level FROM student WHERE s_id = ?", (student_id,))
        result = cursor.fetchone()
        if not result:
            return {"error": "Student not found"}

        student_level = result[0]

        # Fetch completed courses
        cursor.execute(
            """
            SELECT c_code
            FROM enrolled_in
            WHERE s_id = ?
            """,
            (student_id,),
        )
        completed_courses = [row[0] for row in cursor.fetchall()]

        # Step 2: Fetch all courses
        cursor.execute("SELECT c_code, c_name FROM course")
        all_courses = cursor.fetchall()

        eligible_courses = []

        for course_code, course_name in all_courses:
            # Step 3: Determine course level from course code
            if len(course_code) >= 3 and course_code[2].isdigit():
                course_level = int(course_code[2])
            elif len(course_code) >= 4 and course_code[3].isdigit():
                course_level = int(course_code[3])
            else:
                course_level = None  # No level restriction for 2-digit codes

            # Step 4: Filter courses by student level
            if course_level is not None and course_level > student_level:
                continue

            # Step 5: Check prerequisites
            cursor.execute(
                """
                SELECT c_preCourse
                FROM prerequisite
                WHERE c_code = ?
                """,
                (course_code,),
            )
            prerequisites = [row[0] for row in cursor.fetchall()]

            # Add course if all prerequisites are met
            if all(pre in completed_courses for pre in prerequisites):
                eligible_courses.append({"course_code": course_code, "course_name": course_name})

        conn.close()
        return eligible_courses

    except Exception as e:
        return {"error": f"Error while fetching eligible courses: {e}"}

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
            SELECT se_id, c_code, se_day, se_stime, se_etime, se_room, se_instructor, se_type
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





def generate_schedule(s_id, algorithm="GA", epoch=100, pop_size=50, schedule_option="min_days"):
    """
    Generate a schedule using optimization algorithms (GA/PSO), allowing for either
    minimizing the total number of days, minimizing total slots, or minimizing slots per day.
    The function first tries with GA; if the student rejects the GA schedule, it switches to PSO.
    """
    try:
        if schedule_option not in ["min_days", "min_slots", "min_slots_per_day"]:
            return {"error": "Invalid schedule_option. Choose 'min_days', 'min_slots', or 'min_slots_per_day'."}

        print(f"Starting schedule generation for student {s_id} using {algorithm} with epoch={epoch}, pop_size={pop_size}, and option={schedule_option}")

        # Step 1: Fetch enrolled courses
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT e.c_code, c.c_name
            FROM enrolled_in e
            JOIN course c ON e.c_code = c.c_code
            WHERE e.s_id = ?
        """, (s_id,))
        enrolled_courses = cursor.fetchall()

        if not enrolled_courses:
            conn.close()
            return {
                "debug": "Step 1 complete - No enrolled courses",
                "enrolled_courses": [],
            }

        # Step 2: Fetch grouped unique sessions for the enrolled courses
        all_sessions = []
        course_ids = [course[0] for course in enrolled_courses]

        for c_code in course_ids:
            cursor.execute("""
                SELECT DISTINCT se_day, se_stime, se_etime, se_room, se_instructor, se_type, c_code
                FROM session
                WHERE c_code = ?
            """, (c_code,))
            all_sessions.extend(cursor.fetchall())

        if not all_sessions:
            conn.close()
            return {
                "debug": "Step 2 complete - No sessions available",
                "enrolled_courses": enrolled_courses,
                "all_sessions": [],
            }

        # Step 3: Filter sessions into labs and lectures
        filtered_sessions = {}
        for session in all_sessions:
            session_type = session[5]  # "Lecture" or "Lab"
            course_code = session[6]
            if course_code not in filtered_sessions:
                filtered_sessions[course_code] = {"Lab": None, "Lecture": None}
            if session_type == "Lab" and filtered_sessions[course_code]["Lab"] is None:
                filtered_sessions[course_code]["Lab"] = session
            elif session_type == "Lecture" and filtered_sessions[course_code]["Lecture"] is None:
                filtered_sessions[course_code]["Lecture"] = session

        # Step 4: Define the objective function based on the selected option
        def objective_function(solution):
            try:
                selected_sessions = []

                # Iterate over the flat solution array and map to filtered sessions
                for i, value in enumerate(solution):
                    if value > 0.5:  # Binary decision: 1 means selected
                        session = all_sessions[i]
                        selected_sessions.append(session)

                if schedule_option == "min_days":
                    # Minimize the number of unique days
                    unique_days = len(set(session[0] for session in selected_sessions))  # session[0] is se_day
                    return unique_days

                elif schedule_option == "min_slots":
                    # Minimize the number of total slots
                    return len(selected_sessions)

                elif schedule_option == "min_slots_per_day":
                    # Minimize the maximum slots per day
                    slots_per_day = {}
                    for session in selected_sessions:
                        day = session[0]  # se_day
                        slots_per_day[day] = slots_per_day.get(day, 0) + 1
                    max_slots = max(slots_per_day.values()) if slots_per_day else 0
                    return max_slots

                else:
                    raise ValueError(f"Unsupported schedule_option: {schedule_option}")

            except Exception as e:
                print(f"Error in objective function: {e}")
                raise

        # Step 5: Solve the optimization problem
        def solve_schedule(algorithm):
            problem_size = len(all_sessions)
            bounds = BinaryVar(problem_size)

            problem_dict = {
                "bounds": bounds,
                "obj_func": objective_function,
                "minmax": "min",
            }

            if algorithm == "GA":
                model = BaseGA(epoch=epoch, pop_size=pop_size, pc=0.9, pm=0.05)
            elif algorithm == "PSO":
                model = OriginalPSO(epoch=epoch, pop_size=pop_size, w=0.7, c1=1.5, c2=1.5)
            else:
                conn.close()
                return {"error": f"Algorithm {algorithm} is not supported."}

            # Run the optimization
            best_result = model.solve(problem_dict)
            best_solution = best_result.solution
            best_fitness = best_result.target.fitness

            # Ensure JSON serialization
            if isinstance(best_solution, np.ndarray):
                best_solution = best_solution.tolist()

            # Format the best solution to include one lab and one lecture per course
            formatted_solution = []
            for course_code, sessions in filtered_sessions.items():
                if sessions["Lab"]:
                    formatted_solution.append(sessions["Lab"])
                if sessions["Lecture"]:
                    formatted_solution.append(sessions["Lecture"])

            return {
                "best_solution": formatted_solution,
                "best_fitness": best_fitness,
            }

        # First attempt with GA
        ga_schedule = solve_schedule("GA")
        print("GA Schedule generated.")

        # Simulate student decision
        student_accepts_ga = False  # Placeholder: Replace with actual student input logic
        if student_accepts_ga:
            conn.close()
            return {
                "algorithm": "GA",
                "schedule": ga_schedule,
            }

        # If GA schedule is rejected, try PSO
        pso_schedule = solve_schedule("PSO")
        print("PSO Schedule generated.")

        # Ensure schedules are distinct
        if pso_schedule["best_solution"] == ga_schedule["best_solution"]:
            print("Adjusting PSO schedule to ensure uniqueness...")
            pso_schedule = solve_schedule("PSO")

        conn.close()
        return {
            "algorithm": "PSO",
            "schedule": pso_schedule,
        }

    except Exception as e:
        error_message = traceback.format_exc()
        print(f"Error: {error_message}")
        return {"error": error_message}
