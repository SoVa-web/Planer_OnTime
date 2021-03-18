const a = 1;

function foo(name) {
  const lastName = name;
  return lastName;
}

const x = 200;

console.log(x, a);
foo('Denis');

const arrow = () => {
  console.log('arrow');
};

arrow();

const obj = {
  name: 'Denis',
};

const name1 = obj.name;
