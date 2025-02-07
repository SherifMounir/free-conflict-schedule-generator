import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from logic import (
    register_student,
    enroll_student,
    get_all_courses,
    get_enrolled_courses,
    generate_schedule,
    login_student,  # Import the login function
)

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status_code=200):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        if self.path == "/api/courses":
            self._handle_get_courses()
        else:
            self._set_headers(404)
            self._send_response({"error": "Endpoint not found"})

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length)

        try:
            data = json.loads(post_data.decode("utf-8"))
        except json.JSONDecodeError:
            self._set_headers(400)
            self._send_response({"error": "Invalid JSON format"})
            return

        if self.path == "/api/register":
            self._handle_register(data)
        elif self.path == "/api/enroll":
            self._handle_enroll(data)
        elif self.path == "/api/generate-schedule":
            self._handle_generate_schedule(data)
        elif self.path == "/api/login":
            self._handle_login(data)
        else:
            self._set_headers(404)
            self._send_response({"error": "Endpoint not found"})

    def _handle_get_courses(self):
        student_id = self.headers.get("Student-ID")
        if not student_id or not student_id.isdigit():
            self._set_headers(400)
            self._send_response({"error": "Invalid or missing Student-ID header"})
            return

        try:
            print(f"Fetching eligible courses for student_id {student_id}")
            response = get_all_courses(int(student_id))
            self._set_headers(200 if "error" not in response else 400)
            self._send_response(response)
        except Exception as e:
            print(f"Error fetching eligible courses: {e}")
            self._set_headers(500)
            self._send_response({"error": "Internal server error"})

    def _handle_register(self, data):
        required_fields = ["name", "email", "password", "gpa", "level"]
        if not all(field in data for field in required_fields):
            self._set_headers(400)
            self._send_response({"error": "Missing required fields"})
            return

        try:
            print(f"Registering student: {data}")
            response = register_student(
                data["name"],
                data["email"],
                data["password"],
                data["gpa"],
                data["level"])
            self._set_headers(201 if "message" in response else 400)
            self._send_response(response)
        except Exception as e:
            print(f"Error registering student: {e}")
            self._set_headers(500)
            self._send_response({"error": "Internal server error"})

    def _handle_enroll(self, data):
        required_fields = ["student_id", "course_code", "semester"]
        if not all(field in data for field in required_fields):
            self._set_headers(400)
            self._send_response({"error": "Missing required fields"})
            return

        try:
            print(f"Enrolling student: {data}")
            response = enroll_student(data["student_id"], data["course_code"], data["semester"])
            self._set_headers(200 if "message" in response else 400)
            self._send_response(response)
        except Exception as e:
            print(f"Error enrolling student: {e}")
            self._set_headers(500)
            self._send_response({"error": "Internal server error"})

    def _handle_generate_schedule(self, data):
        student_id = data.get("student_id")
        preferences = data.get("preferences", {})

        if not student_id:
            self._set_headers(400)
            self._send_response({"error": "Missing student_id"})
            return

        algorithm = preferences.get("algorithm", "GA")
        epoch = preferences.get("epoch", 100)
        pop_size = preferences.get("pop_size", 50)
        schedule_option = preferences.get("schedule_option", "min_days")

        try:
            print(f"Generating schedule for student_id {student_id} with preferences: {preferences}")
            response = generate_schedule(student_id, algorithm, epoch, pop_size, schedule_option)
            self._set_headers(200 if "error" not in response else 400)
            self._send_response(response)
        except Exception as e:
            print(f"Error generating schedule: {e}")
            self._set_headers(500)
            self._send_response({"error": "Internal server error"})

    def _handle_login(self, data):
        required_fields = ["email", "password"]
        if not all(field in data for field in required_fields):
            self._set_headers(400)
            self._send_response({"error": "Missing email or password"})
            return

        try:
            print(f"Logging in student: {data['email']}")
            response = login_student(data["email"], data["password"])
            self._set_headers(200 if "error" not in response else 401)
            self._send_response(response)
        except Exception as e:
            print(f"Error logging in student: {e}")
            self._set_headers(500)
            self._send_response({"error": "Internal server error"})

    def _send_response(self, response):
        self.wfile.write(json.dumps(response).encode())


def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8000):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Server running on port {port}")
    httpd.serve_forever()


if __name__ == "__main__":
    run()
