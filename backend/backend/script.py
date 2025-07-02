import pandas as pd
import sqlite3
from pathlib import Path
import sys

def validate_excel_path(excel_path):
    """Verify the Excel file exists and is accessible"""
    path = Path(excel_path)
    if not path.exists():
        # Try to find similar files
        directory = path.parent
        if directory.exists():
            similar_files = list(directory.glob("*.xls*"))
            if similar_files:
                suggestions = "\n".join(f"  - {f.name}" for f in similar_files)
                raise FileNotFoundError(
                    f"File '{path.name}' not found. Similar files in directory:\n{suggestions}"
                )
        raise FileNotFoundError(f"File not found: {excel_path}")
    return path

def migrate_excel_to_sqlite(excel_path, db_path):
    """Main migration function with complete error handling"""
    print(f"🚀 Starting migration from {excel_path} to {db_path}")
    
    try:
        # 1. Validate and load Excel file
        excel_path = validate_excel_path(excel_path)
        print("📂 Loading Excel data...")
        df = pd.read_excel(excel_path)
        
        # 2. Clean and standardize column names
        print("🧹 Cleaning data...")
        df.columns = [col.strip().lower().replace(' ', '_') for col in df.columns]
        required_columns = {'courseid', 'student_code', 'gradeletter'}
        if not required_columns.issubset(df.columns):
            print("set(df.columns) :" , set(df.columns))
            missing = required_columns - set(df.columns)
            raise ValueError(f"Missing required columns: {missing}")

        # 3. Connect to SQLite database
        print("🔗 Connecting to database...")
        conn = sqlite3.connect(db_path)
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA busy_timeout=5000")
        
        # 4. Create and populate temp table
        print("🛠 Creating temporary table...")
        conn.execute("DROP TABLE IF EXISTS temp_student_grades")
        conn.execute("""
            CREATE TABLE temp_student_grades (
                courseid TEXT,
                student_code TEXT,
                gradeletter TEXT,
                current_faculty TEXT,
                current_majorid TEXT,
                sem TEXT
            )
        """)
        
        # 5. Import data in chunks
        print("📤 Importing data...")
        chunksize = 1000  # Adjust based on your system memory
        for i in range(0, len(df), chunksize):
            df[i:i+chunksize].to_sql(
                'temp_student_grades',
                conn,
                if_exists='append',
                index=False
            )
            print(f"  ↳ Processed rows {i} to {min(i+chunksize, len(df))}")
        
        # 6. Verify migration
        count = conn.execute("SELECT COUNT(*) FROM temp_student_grades").fetchone()[0]
        print(f"✅ Successfully migrated {count} records!")
        return True
        
    except Exception as e:
        print(f"❌ Migration failed: {str(e)}", file=sys.stderr)
        return False
    finally:
        if 'conn' in locals():
            conn.close()
            print("🔒 Database connection closed")

if __name__ == "__main__":
    # Configuration - Update these paths as needed
    EXCEL_PATH = r"C:\Users\sherif.mounir\Downloads\UPDATED\data .xlsx"
    DB_PATH = "schedule.db"
    
    # Run migration
    success = migrate_excel_to_sqlite(EXCEL_PATH, DB_PATH)
    
    # Exit with appropriate status code
    sys.exit(0 if success else 1)