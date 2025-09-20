import pytest
from pathlib import Path
import json
import tempfile
import os

from codable import Codable


# Test classes inheriting from Codable
class Person(Codable):
	name: str
	age: int
	email: str


class Address(Codable):
	street: str
	city: str
	postal_code: str
	country: str


class PersonWithAddress(Codable):
	name: str
	age: int
	address: Address
	is_active: bool


class Company(Codable):
	name: str
	employees: list[Person]
	headquarters: Address
	departments: list[str]
	revenue: float


class Course(Codable):
	title: str
	instructor: Person
	students: list[Person]
	location: Address
	credits: int
	prerequisites: list[str]


class University(Codable):
	name: str
	courses: list[Course]
	staff: list[Person]
	campuses: dict[str, Address]
	student_count: int
	is_public: bool


class OptionalFields(Codable):
	required_field: str
	optional_number: int | None
	optional_list: list[str] | None


class ComplexNested(Codable):
	university: University
	partner_companies: list[Company]
	contact_info: dict[str, str | int]
	tags: set[str]
	coordinates: tuple[float, float]


class TestParse2Type:
	
	def test_basic_types(self):
		"""Test parsing basic Python types"""
		assert Codable.parse2type("hello", str) == "hello"
		assert Codable.parse2type(42, int) == 42
		assert Codable.parse2type(3.14, float) == 3.14
		assert Codable.parse2type(True, bool) == True
	
	def test_list_parsing(self):
		"""Test parsing lists with type annotations"""
		result = Codable.parse2type([1, 2, 3], list[int])
		assert result == [1, 2, 3]
		assert isinstance(result, list)
		
		result = Codable.parse2type(["a", "b", "c"], list[str])
		assert result == ["a", "b", "c"]
	
	def test_dict_parsing(self):
		"""Test parsing dictionaries with type annotations"""
		data = {"key1": "value1", "key2": "value2"}
		result = Codable.parse2type(data, dict[str, str])
		assert result == data
		
		data = {"a": 1, "b": 2}
		result = Codable.parse2type(data, dict[str, int])
		assert result == data
	
	def test_set_parsing(self):
		"""Test parsing sets with type annotations"""
		data = [1, 2, 3, 2, 1]  # Input as list with duplicates
		result = Codable.parse2type(data, set[int])
		assert result == {1, 2, 3}
		assert isinstance(result, set)
	
	def test_tuple_parsing(self):
		"""Test parsing tuples with type annotations"""
		data = [1, 2, 3]
		result = Codable.parse2type(data, tuple[int])
		assert result == (1, 2, 3)
		assert isinstance(result, tuple)
	
	def test_union_type_parsing(self):
		"""Test parsing Union types"""
		# Should parse as int
		result = Codable.parse2type(42, int | str)
		assert result == 42
		assert isinstance(result, int)
		
		# Should parse as str
		result = Codable.parse2type("hello", int | str)
		assert result == "hello"
		assert isinstance(result, str)
	
	def test_codable_parsing(self):
		"""Test parsing Codable objects"""
		person_data = {
			"name": "John Doe",
			"age": 30,
			"email": "john@example.com"
		}
		result = Codable.parse2type(person_data, Person)
		assert isinstance(result, Person)
		assert result.name == "John Doe"
		assert result.age == 30
		assert result.email == "john@example.com"
	
	def test_nested_list_of_codables(self):
		"""Test parsing lists of Codable objects"""
		people_data = [
			{"name": "Alice", "age": 25, "email": "alice@example.com"},
			{"name": "Bob", "age": 35, "email": "bob@example.com"}
		]
		result = Codable.parse2type(people_data, list[Person])
		assert len(result) == 2
		assert isinstance(result[0], Person)
		assert result[0].name == "Alice"
		assert result[1].name == "Bob"
	
	def test_invalid_parsing(self):
		"""Test error handling for invalid parsing"""
		with pytest.raises(RuntimeError):
			Codable.parse2type("not_a_number", int)
		
		with pytest.raises(RuntimeError):
			Codable.parse2type({"invalid": "data"}, list[int])


class TestCodable:
	
	def test_simple_codable(self):
		"""Test basic Codable functionality"""
		person = Person(name="John", age=30, email="john@example.com")
		assert person.name == "John"
		assert person.age == 30
		assert person.email == "john@example.com"
	
	def test_codable_with_missing_field(self):
		"""Test Codable raises error for missing required fields"""
		with pytest.raises(RuntimeError):
			Person(name="John", age=30)  # Missing email
	
	
	def test_nested_codable(self):
		"""Test Codable with nested Codable objects"""
		address_data = {
			"street": "123 Main St",
			"city": "New York",
			"postal_code": "10001",
			"country": "USA"
		}
		
		person_data = {
			"name": "Jane Doe",
			"age": 28,
			"address": address_data,
			"is_active": True
		}
		
		person = PersonWithAddress(**person_data)
		assert person.name == "Jane Doe"
		assert person.age == 28
		assert isinstance(person.address, Address)
		assert person.address.city == "New York"
		assert person.is_active
	
	def test_complex_nested_structure(self):
		"""Test deeply nested Codable structures"""
		address_data = {
			"street": "456 Oak Ave",
			"city": "Boston",
			"postal_code": "02101",
			"country": "USA"
		}
		
		instructor_data = {
			"name": "Dr. Smith",
			"age": 45,
			"email": "smith@university.edu"
		}
		
		students_data = [
			{"name": "Alice", "age": 20, "email": "alice@student.edu"},
			{"name": "Bob", "age": 21, "email": "bob@student.edu"}
		]
		
		course_data = {
			"title": "Advanced Mathematics",
			"instructor": instructor_data,
			"students": students_data,
			"location": address_data,
			"credits": 4,
			"prerequisites": ["Calculus I", "Linear Algebra"]
		}
		
		course = Course(**course_data)
		assert course.title == "Advanced Mathematics"
		assert isinstance(course.instructor, Person)
		assert course.instructor.name == "Dr. Smith"
		assert len(course.students) == 2
		assert isinstance(course.students[0], Person)
		assert course.students[0].name == "Alice"
		assert isinstance(course.location, Address)
		assert course.credits == 4
		assert course.prerequisites == ["Calculus I", "Linear Algebra"]
	
	def test_very_complex_nested_structure(self):
		"""Test extremely complex nested structures"""
		# Create sample data for University
		address1 = {
			"street": "100 University Ave",
			"city": "Cambridge",
			"postal_code": "02138",
			"country": "USA"
		}
		
		address2 = {
			"street": "200 College St",
			"city": "Boston",
			"postal_code": "02115",
			"country": "USA"
		}
		
		instructor = {
			"name": "Dr. Johnson",
			"age": 50,
			"email": "johnson@university.edu"
		}
		
		students = [
			{"name": "Charlie", "age": 19, "email": "charlie@student.edu"},
			{"name": "Diana", "age": 20, "email": "diana@student.edu"}
		]
		
		course = {
			"title": "Computer Science 101",
			"instructor": instructor,
			"students": students,
			"location": address1,
			"credits": 3,
			"prerequisites": ["Mathematics"]
		}
		
		university_data = {
			"name": "MIT",
			"courses": [course],
			"staff": [instructor],
			"campuses": {
				"main": address1,
				"satellite": address2
			},
			"student_count": 11000,
			"is_public": False
		}
		
		company_data = {
			"name": "Tech Corp",
			"employees": [
				{"name": "Engineer 1", "age": 30, "email": "eng1@tech.com"}
			],
			"headquarters": address2,
			"departments": ["Engineering", "Marketing"],
			"revenue": 1000000.0
		}
		
		complex_data = {
			"university": university_data,
			"partner_companies": [company_data],
			"contact_info": {
				"phone": "555-1234",
				"extension": 123
			},
			"tags": ["education", "technology", "research"],
			"coordinates": [42.3601, -71.0589]
		}
		
		complex_obj = ComplexNested(**complex_data)
		
		# Verify the complex structure
		assert isinstance(complex_obj.university, University)
		assert complex_obj.university.name == "MIT"
		assert len(complex_obj.university.courses) == 1
		assert isinstance(complex_obj.university.courses[0], Course)
		assert complex_obj.university.courses[0].title == "Computer Science 101"
		
		assert len(complex_obj.partner_companies) == 1
		assert isinstance(complex_obj.partner_companies[0], Company)
		assert complex_obj.partner_companies[0].name == "Tech Corp"
		
		assert isinstance(complex_obj.tags, set)
		assert complex_obj.tags == {"education", "technology", "research"}
		
		assert isinstance(complex_obj.coordinates, tuple)
		assert complex_obj.coordinates == (42.3601, -71.0589)
	
	def test_parse_class_method(self):
		"""Test the parse class method"""
		person_data = {
			"name": "Test Person",
			"age": 25,
			"email": "test@example.com"
		}
		person = Person.parse(person_data)
		assert isinstance(person, Person)
		assert person.name == "Test Person"
	
	def test_encode_method(self):
		"""Test the encode method"""
		person = Person(name="John", age=30, email="john@example.com")
		encoded = person.encode()
		
		# Should be valid JSON
		decoded = json.loads(encoded)
		assert decoded["name"] == "John"
		assert decoded["age"] == 30
		assert decoded["email"] == "john@example.com"
	
	def test_decode_from_string(self):
		"""Test decoding from JSON string"""
		json_str = '{"name": "Alice", "age": 25, "email": "alice@example.com"}'
		person = Person.decode_from_json_string(json_str)
		assert isinstance(person, Person)
		assert person.name == "Alice"
		assert person.age == 25
	
	def test_decode_from_path(self):
		"""Test decoding from file path"""
		person_data = {"name": "Bob", "age": 35, "email": "bob@example.com"}
		
		# Create temporary file
		with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
			json.dump(person_data, f)
			temp_path = f.name
		
		try:
			# Test decoding from path
			person = Person.decode_from_path(Path(temp_path))
			assert isinstance(person, Person)
			assert person.name == "Bob"
			assert person.age == 35
		finally:
			# Clean up
			os.unlink(temp_path)
	
	def test_encode_decode_roundtrip(self):
		"""Test that encoding and decoding preserves data"""
		# Create complex nested object
		address = Address(
			street="789 Pine St",
			city="Seattle",
			postal_code="98101",
			country="USA"
		)
		
		person_with_address = PersonWithAddress(
			name="Test User",
			age=40,
			address=address,
			is_active=True
		)
		
		# Encode and decode
		encoded = person_with_address.encode()
		decoded = PersonWithAddress.decode_from_json_string(encoded)
		
		# Verify data integrity
		assert decoded.name == "Test User"
		assert decoded.age == 40
		assert decoded.is_active
		assert isinstance(decoded.address, Address)
		assert decoded.address.street == "789 Pine St"
		assert decoded.address.city == "Seattle"
	
	def test_union_types_in_codable(self):
		"""Test Codable with Union types"""
		# Test with int value
		obj1 = OptionalFields(
			required_field="test",
			optional_number=42,
			optional_list=["a", "b", "c"]
		)
		assert obj1.optional_number == 42
		assert obj1.optional_list == ["a", "b", "c"]
		
		# Test with None values
		obj2 = OptionalFields(
			required_field="test2",
			optional_number=None,
			optional_list=None
		)
		assert obj2.optional_number is None
		assert obj2.optional_list is None


# Run with: pytest test_codable.py
