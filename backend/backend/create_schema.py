import sqlite3
import pandas as pd

# Define file paths and database connection
file_path = 'data/courses.xlsx'
db_path = 'schedule.db'

# Load and inspect Excel data
print("Loading Excel data...")
excel_data = pd.ExcelFile(file_path)
print(f"Sheet names: {excel_data.sheet_names}")

# Parse the sheet and filter necessary columns
print("Parsing data from 'Sheet1'...")
sheet_data = excel_data.parse('Sheet1')

# Columns required for courses and prerequisites
course_columns_needed = ['COURSEID', 'CNAME', 'ORG_CHECK', 'ORG_COURSE']
session_columns_needed = ['COURSEID', 'CAPACITY', 'GROUP_TYPE_CD', 'ROOMID', 'DAY_NAME', 'S_TIME', 'E_TIME', 'CF_EMP']

# Process data for the `course` table
filtered_data = sheet_data[course_columns_needed]
courses_data = filtered_data[['COURSEID', 'CNAME']].drop_duplicates()

# Process data for the `prerequisite` table
prerequisite_data = filtered_data[filtered_data['ORG_CHECK'] == 'YES'][['COURSEID', 'ORG_COURSE']].dropna()

# Process data for the `session` table
session_data = sheet_data[session_columns_needed].drop_duplicates()

# Connect to SQLite database (creates file if not exists)
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Define the schema
print("Creating database schema...")
schema = """
CREATE TABLE IF NOT EXISTS student (
    s_id INTEGER PRIMARY KEY AUTOINCREMENT,
    s_name TEXT NOT NULL,
    s_email TEXT UNIQUE NOT NULL,
    s_password TEXT NOT NULL,
    s_gpa REAL CHECK(s_gpa BETWEEN 0 AND 4.0) NOT NULL,
    s_level INTEGER CHECK(s_level BETWEEN 1 AND 4) NOT NULL
);

CREATE TABLE IF NOT EXISTS course (
    c_code TEXT PRIMARY KEY,
    c_name TEXT NOT NULL,
    c_creditHours INTEGER DEFAULT 0 CHECK(c_creditHours >= 0)
);

CREATE TABLE IF NOT EXISTS prerequisite (
    c_code TEXT NOT NULL,
    c_preCourse TEXT NOT NULL,
    PRIMARY KEY (c_code, c_preCourse),
    FOREIGN KEY (c_code) REFERENCES course (c_code) ON DELETE CASCADE,
    FOREIGN KEY (c_preCourse) REFERENCES course (c_code) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS session (
    se_id INTEGER PRIMARY KEY AUTOINCREMENT,
    c_code TEXT NOT NULL,
    se_capacity INTEGER NOT NULL CHECK(se_capacity > 0),
    se_type TEXT CHECK(se_type IN ('Lecture', 'Lab')) NOT NULL,
    se_room TEXT NOT NULL,
    se_day TEXT NOT NULL,
    se_stime TEXT NOT NULL,
    se_etime TEXT NOT NULL,
    se_instructor TEXT NOT NULL,
    FOREIGN KEY (c_code) REFERENCES course (c_code) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS attends (
    s_id INTEGER NOT NULL,
    se_id INTEGER NOT NULL,
    PRIMARY KEY (s_id, se_id),
    FOREIGN KEY (s_id) REFERENCES student (s_id) ON DELETE CASCADE,
    FOREIGN KEY (se_id) REFERENCES session (se_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS enrolled_in (
    s_id INTEGER NOT NULL,
    c_code TEXT NOT NULL,
    se_semester TEXT NOT NULL,
    s_grade TEXT CHECK(s_grade IN ('A', 'B', 'C', 'D', 'F', 'I', NULL)),
    PRIMARY KEY (s_id, c_code, se_semester),
    FOREIGN KEY (s_id) REFERENCES student (s_id) ON DELETE CASCADE,
    FOREIGN KEY (c_code) REFERENCES course (c_code) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS student_schedule (
    s_id INTEGER NOT NULL,
    schedule_schema JSON NOT NULL,
    FOREIGN KEY (s_id) REFERENCES student (s_id) ON DELETE CASCADE
);
"""
cursor.executescript(schema)
conn.commit()
print("Database schema created successfully!")

# Insert dummy data into the `student` table
print("Inserting dummy data into 'student' table...")
students = [
    ("Alice Johnson", "alice@msa.edu.eg", "password123", 3.5, 1),
    ("Bob Smith", "bob@msa.edu.eg", "password456", 3.8, 2),
    ("Menna Elbanna", "menna@msa.edu.eg", "password789", 3.2, 3),
    ("Diana Prince", "diana@msa.edu.eg", "password321", 3.9, 4),
]
for student in students:
    cursor.execute(
        """
        INSERT OR IGNORE INTO student (s_name, s_email, s_password, s_gpa, s_level)
        VALUES (?, ?, ?, ?, ?);
        """,
        student,
    )

# Insert data into the `course` table
print("Inserting data into 'course' table...")
for _, row in courses_data.iterrows():
    cursor.execute(
        """
        INSERT OR IGNORE INTO course (c_code, c_name, c_creditHours)
        VALUES (?, ?, ?);
        """,
        (row['COURSEID'], row['CNAME'], 0),
    )

# Insert data into the `prerequisite` table
print("Inserting data into 'prerequisite' table...")
for _, row in prerequisite_data.iterrows():
    cursor.execute(
        """
        INSERT OR IGNORE INTO prerequisite (c_code, c_preCourse)
        VALUES (?, ?);
        """,
        (row['COURSEID'], row['ORG_COURSE']),
    )

# Insert data into the `session` table
print("Inserting data into 'session' table...")
for _, row in session_data.iterrows():
    cursor.execute(
        """
        INSERT OR IGNORE INTO session (
            c_code, se_capacity, se_type, se_room, se_day,
            se_stime, se_etime, se_instructor
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        """,
        (
            row['COURSEID'], row['CAPACITY'], row['GROUP_TYPE_CD'],
            row['ROOMID'], row['DAY_NAME'], row['S_TIME'],
            row['E_TIME'], row['CF_EMP']
        ),
    )

# Commit changes
conn.commit()
print("Data successfully inserted into tables.")

# Display table schemas for verification
def show_schema(cursor):
    print("\nDatabase Table Schemas:")
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    for table in tables:
        print(f"\nSchema for table: {table[0]}")
        cursor.execute(f"PRAGMA table_info({table[0]});")
        columns = cursor.fetchall()
        for column in columns:
            print(column)

show_schema(cursor)

# Close the connection
conn.close()
print("Connection closed.")
