const fs = require('fs');

const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
  'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Kabir', 'Jaspreet', 'Amritpal', 'Amrita', 'Riya', 'Aanya',
  'Kavya', 'Dhruv', 'Siddharth', 'Manish', 'Rahul', 'Rohit', 'Priya', 'Anjali', 'Sneha', 'Simran',
  'Simar', 'Manpreet', 'Harpreet', 'Gurpreet', 'Mandeep', 'Sandeep', 'Gagan', 'Gagandeep', 'Prabh', 'Neha',
  'Amit', 'Aman', 'Baljeet', 'Bikram', 'Deepak', 'Gurmeet', 'Kiran', 'Mehak', 'Navjot', 'Parminder',
  'Preeti', 'Raj', 'Ravi', 'Ritu', 'Sahil', 'Sakshi', 'Shivam', 'Surya', 'Tanya', 'Vikram'
];

const lastNames = [
  'Sharma', 'Singh', 'Kumar', 'Kaur', 'Verma', 'Gupta', 'Yadav', 'Joshi', 'Patel', 'Das',
  'Chauhan', 'Rajput', 'Mishra', 'Pandey', 'Tiwari', 'Bhatia', 'Malhotra', 'Sethi', 'Kapoor', 'Reddy'
];

const classes = ['X-A', 'X-B', 'X-C', 'XI-A', 'XI-B', 'XII-A', 'XII-Sci', 'XII-Com', 'IX-A', 'IX-B'];

const students = [];

// Adding specific edge cases
students.push({
  "Roll Number": "1001",
  "Name": "Amritpal Singh",
  "Class": "XII-Sci"
});

students.push({
  "Roll Number": "1002",
  "Name": "Amrita Sharma",
  "Class": "XII-Com"
});

students.push({
  "Roll Number": "1003",
  "Name": "Jaspreet Kaur",
  "Class": "XI-B"
});

students.push({
  "Roll Number": "1004",
  "Name": "Jaspreet Singh",
  "Class": "X-A"
});

students.push({
  "Roll Number": "1005",
  "Name": "Rahul O'Connor", // Special character
  "Class": "IX-A"
});

students.push({
  "Roll Number": "1006",
  "Name": "Simran   Jeet", // Spaces
  "Class": "XII-A"
});

// Adding random students to make total 50+
let rollCounter = 1007;
while (students.length < 50) {
  const fname = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
  const cls = classes[Math.floor(Math.random() * classes.length)];
  
  students.push({
    "Roll Number": String(rollCounter++),
    "Name": `${fname} ${lname}`,
    "Class": cls
  });
}

fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
console.log('Successfully generated students.json with', students.length, 'records.');
