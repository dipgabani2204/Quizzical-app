import React from "react";
import Question from "./Question";
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = { questions: [], userAns: [], marks: 0, showMarks: false, showBgColor: false }
    }

    async componentDidMount() {
        let response = await fetch("https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple");
        let content = await response.json();

        const ques = content.results;
        let dataArr = [];

        for (let i = 0; i < 5; i++) {
            const queArr = {};
            let que = ques[i].question;
            let ans = ques[i].correct_answer;
            let opt = [ques[i].incorrect_answers[0], ques[i].incorrect_answers[1], ques[i].incorrect_answers[2], ans];
            opt = shuffleArray(opt);
            queArr['question'] = que;
            queArr['ans'] = ans;
            queArr['opt'] = opt;
            queArr['key'] = nanoid();
            dataArr.push(queArr);
        }

        this.setState({
            questions: dataArr,
        })
    }

    getUserAns = (opt) => {

        this.setState(oldValue => {
            return {
                ...oldValue,

                //important syntax...
                userAns: [...oldValue.userAns, opt]
            }
        })
    }

    getResult = () => {

        for (let i = 0; i < 5; i++) {
            if (this.state.userAns[i] === this.state.questions[i].ans) {
                this.setState(oldValue => {
                    return {
                        ...oldValue,
                        marks: oldValue.marks + 1
                    }
                })
            }
        }
        this.setState(oldValue => {
            return {
                ...oldValue,
                showMarks: !oldValue.showMarks,
                showBgColor: !oldValue.showBgColor
            }
        })
    }

    playAgain = () => {
        this.setState(oldValue => {
            return {
                ...oldValue,
                showMarks: !oldValue.showMarks,
                showBgColor: !oldValue.showBgColor
            }
        })
        window.location.reload(false);
    }

    render() {

        return (
            <div className="container">
                <div className="questions-main">
                    {this.state.questions.map(data => {
                        return <Question
                            que={data.question}
                            opt1={data.opt[0]}
                            opt2={data.opt[1]}
                            opt3={data.opt[2]}
                            opt4={data.opt[3]}
                            ans={data.ans}
                            key={data.key}
                            showBgColor = {this.state.showBgColor}
                            id={data.key}
                            getUserAns={this.getUserAns}
                        />
                    })}
                </div>

                <div className="result">
                    {this.state.showMarks && <span className="marks">You scored {this.state.marks}/5 correct answers</span>}
                    {!this.state.showMarks && <button className="btn-check-ans" onClick={this.getResult}>Check answers</button>}
                    {this.state.showMarks && <button className="btn-check-ans" onClick={this.playAgain}>Play again </button>}
                </div>
            </div>
        )
    }
}

export default Main;
