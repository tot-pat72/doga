/**
 * 
 */
class Area{
    #div 
    #manager
    /**
     * 
     * @param {string} cssClass 
     */
    constructor(cssClass, manager){
        const container = this.#getContainer();
        this.#div = document.createElement('div');
        this.#div.className = cssClass;
        container.appendChild(this.#div)

        manager.setFinishCallback((halott_penz) => {
            container.innerHTML = "";
            const divaa = document.createElement('div');
            divaa.textContent = halott_penz;
            container.appendChild(divaa);
        })

        this.#manager = manager;
    }

    #getContainer(){
        let container = document.querySelector('.container');

        if(!container){
            container = document.createElement('div');
            container.className = 'container';
            document.body.appendChild(container);
        }
        return container;
    }

    get div(){
        return this.#div;
    }

    get manager(){
        return this.#manager;
    }
}

class AnswerArea extends Area{
    constructor(cssClass, manager){
        super(cssClass, manager);
        manager.setNextAnswersCallback((answer) => {
            this.div.innerHTML = '';
            for(const valasz of answer){
                const diva = document.createElement('div');
                diva.className = "item";
                diva.innerHTML = valasz;
                this.div.appendChild(diva);

                diva.addEventListener('click', () => {
                    this.div.appendChild(diva);
                    manager.nextQuestion(valasz);
                })
            }
        })
    }
}

class QuestionArea extends Area{
    constructor(cssClass, manager){
        super(cssClass, manager)
        manager.setNextQuestionCallback((questionText) => {
            this.div.innerHTML = '';
            const diva = document.createElement('div');
            diva.textContent = questionText;
            this.div.appendChild(diva);
        })
    }
}