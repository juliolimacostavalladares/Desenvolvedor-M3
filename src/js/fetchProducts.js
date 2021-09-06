function useStateApiData(defaultValue) {
    let value = defaultValue;
    function getValue() {
      return value;
    }
    function setValue(newValue) {
      value = newValue; 
      renderApiData();
    }
    return [getValue, setValue];
}


const [apiData, setApiData] = useStateApiData([])

document.addEventListener('DOMContentLoaded', getData)

async function getData() {
    const response = await fetch(`http://localhost:3000/products`);
    const data = await response.json();
    setApiData(data)
}

function renderApiData() {
    apiData().map(i => {
        var card = `
        <div class="card" color='${i.colors}' size='${i.size} price='${i.proce}'>
            <div class="card-header">
                <img class="card-img" src="${i.image}" alt="">
            </div>
            <div class="card-footer">
                <p class="card-name">${i.name}</p>
                <p class="card-price">R$ ${i.price}</p>
                <p class="card-installments">até ${i.installments[0]} de R$${i.installments[1]}</p>
                <button class="card-btn">Compara</button>
            </div>
        </div>
        `
       let cardList =  document.querySelector('.load-more')

       cardList.insertAdjacentHTML('beforebegin', card)
       
       function useStateCounter(defaultValue) {
        let value = defaultValue;
        function getValue() {
          return value;
        }
        function setValue(newValue) {
          value = newValue; 
          renderCounter();
        }
        return [getValue, setValue];
      }
      
    const [counter, setCounter] = useStateCounter(0);
    
    
    const button = document.querySelectorAll(".card-btn");
    
    button.forEach(i => {
        i.addEventListener("click", increment);
    })
    
    function renderCounter() {
        const style = (function() {
            var style = document.createElement("style");
        
            style.appendChild(document.createTextNode(""));
            document.head.appendChild(style);
            return style;
        })()
        if(parseInt(counter()) <= 9){
            style.sheet.insertRule(`.bolsa::after {
                content: '${counter()}';
                padding: 2.5px 7px !important;
            }`)
        }else {
            style.sheet.insertRule(`.bolsa::after {
                content: '${counter()}';
                padding: 2.5px 3px !important;
            }`)
        }
    }
    renderCounter();
    
        function increment() {
        setCounter(counter() + 1);
        }
    })
}

renderApiData();

function useStateLoadMore(defaultValue) {
    let value = defaultValue;
    function getValue() {
      return value;
    }
    function setValue(newValue) {
      value = newValue; 
      renderLoadMore();
    }
    return [getValue, setValue];
}

const [loadMore, setLoadMore] = useStateLoadMore([])

document.querySelector('.load-more').addEventListener('click', () =>{
    loadProducts(0, 3)
})


async function loadProducts(_start, _end) {
    const response = await fetch(`http://localhost:3000/products?_start=${_start}&_end=${_end}`);
    const data = await response.json();
    setLoadMore(data)
}

renderLoadMore()

function renderLoadMore() {
    loadMore().map(i => {
        var card = `
        <div class="card">
            <div class="card-header">
                <img class="card-img" src="${i.image}" alt="">
            </div>
            <div class="card-footer">
                <p class="card-name">${i.name}</p>
                <p class="card-price">R$ ${i.price}</p>
                <p class="card-installments">até ${i.installments[0]} de R$${i.installments[1]}</p>
                <button class="card-btn">Compara</button>
            </div>
        </div>
        `
       let cardList =  document.querySelector('.load-more')

       cardList.insertAdjacentHTML('beforebegin', card)
    })
    console.log(loadMore())
}
