// Release 0
let student = {};
  student.firstName = 'Petr';
  student.lastName = 'Perviy';
  student.firstName = 'Petya';
  delete student.firstName;
  console.log(student);
// Release 1
let bomba = {};
bomba.firstName = 'Pushka';
bomba.lastName = 'Strashnaya';
let nebomba = {};
nebomba.firstName = 'Nepushka';
nebomba.lastName = 'Nestrashnaya';
let group = [];
group.push(student);
group.push(bomba);
group.push(nebomba);
console.log(group);
