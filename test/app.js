// DOM Tricks
const div = document.createElement('div')
div.appendChild(document.createTextNode('Hello world!'))
document.body.append(div);
div.classList = `myclass`;
div.classList.add('2myclass')
div.classList.remove('2myclass');
div.innerText = "Hello World again!";
// div.style.display = 'none'; //'block to reveal it
const div2 = document.createElement('div');
div2.innerHTML = `New Hello World`;
div2.classList = `myclass2`;
console.log(div2)
console.log(div.classList.contains('myclass'))
console.log(document.querySelector('.myclass'))
console.log(div)
div.replaceWith(div2);


document.querySelector('p').addEventListener('click', () => {
    alert('Ho')
})
window.addEventListener('scroll', () => {
    console.log(window.scrollY)
    console.log(window.scrollX)
})