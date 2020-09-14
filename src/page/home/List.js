import React, { Component } from 'react';
import { formatDateTime, uuid, String } from '../../utils/tool';
import style from './style.css';

class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    id: uuid(),
                    by: 'dhouston',
                    text: '第一条评论 I think: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    time: '8-hours-ago',
                    isFold: true,
                    child: [],
                    replyStats: false,
                },
                {
                    id: uuid(),
                    by: 'norvig',
                    text: '第二条评论 I think: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    time: '34-hours-ago',
                    isFold: true,
                    child: [], //回复列表
                    replyStats: false,
                },
            ],
            textValue: '',
            commitValue: '', //评论
        };
    }

    componentWillMount() {
        const { list } = this.state;
        for (let index = 0; index < 1000; index++) {
            const obj = {
                id: uuid(),
                by: 'norvig',
                text: '第二条评论 I think: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                time: '34-hours-ago',
                isFold: true,
                child: [], //回复列表
                replyStats: false,
            };
            list.push(obj);
        }
        this.setState({ list });
    }

    foldList = (id) => {
        const { list } = this.state;
        this.handeleFold(list, id);
    };

    handeleFold = (list, ID) => {
        let n = 0;
        list.forEach((rows) => {
            if (rows.id === ID) {
                rows.isFold = !rows.isFold;
            }
            if (rows.child && rows.child.length > 0) {
                if (n <= rows.child.length - 1) {
                    n++;
                    this.handeleFold(rows.child, ID);
                }
            }
        });
        this.setState({ list });
    };

    // 添加评论
    addComment = () => {
        const { list, textValue } = this.state;
        if (!textValue) {
            alert('评论不能为空');
            return false;
        }
        let obj = {
            text: textValue,
            by: String(),
            time: formatDateTime(),
            isFold: true,
            child: [],
            replyStats: false,
            id: uuid(),
        };
        list.unshift(obj);
        this.setState({ list, textValue: '' });
    };

    changeInput = (type, event) => {
        if (type === 'list') {
            this.setState({
                textValue: event.target.value,
            });
        }
        if (type === 'commitValue') {
            this.setState({
                commitValue: event.target.value,
            });
        }
    };

    showChildDOM = (array) => {
        const { commitValue } = this.state;
        return array.map((fisrtItem, i) => {
            return (
                <div key={i} className={style.reply}>
                    <div>
                        {fisrtItem.by} {fisrtItem.time} <span onClick={() => this.foldList(fisrtItem.id)}>[-]</span>{' '}
                    </div>

                    {fisrtItem.isFold && (
                        <div className="content">
                            <div>{fisrtItem.text}</div>
                            <div onClick={() => this.isReply(fisrtItem.id)}>reply</div>

                            {fisrtItem.replyStats && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="请回复吧"
                                        value={commitValue}
                                        onChange={(event) => this.changeInput('commitValue', event)}
                                    />
                                    <button onClick={() => this.replyFist(fisrtItem.id)}>ok</button>
                                </div>
                            )}

                            {this.showChildDOM(fisrtItem.child)}
                        </div>
                    )}
                </div>
            );
        });
    };

    isReply = (ID) => {
        const { list } = this.state;
        this.handeleList(list, ID);
        this.setState({ list });
    };

    handeleList = (list, ID) => {
        list.forEach((rows) => {
            if (rows.id === ID) {
                rows.replyStats = !rows.replyStats;
            }
            if (rows.child && rows.child.length > 0) {
                this.handeleList(rows.child, ID);
            }
        });
    };

    replyFist = (ID) => {
        const { list, commitValue } = this.state;
        let obj = {
            text: commitValue,
            by: String(),
            time: formatDateTime(),
            isFold: true,
            child: [],
            replyStats: false,
            id: uuid(),
        };

        this.pushItem(list, ID, obj);
        this.setState({ list, commitValue: '' });
    };

    pushItem = (list, ID, obj) => {
        list.forEach((item) => {
            if (item.id === ID) {
                item.replyStats = !item.replyStats;
                item.child.push(obj);
            }
            if (item.child && item.child.length > 0) {
                this.pushItem(item.child, ID, obj);
            }
        });
    };

    /**
     * fish
     */
    renderList = (list) => {
        const { commitValue } = this.state;

        return list.map((item) => {
            return (
                <div key={item.id} className={style.reply}>
                    <div>
                        {item.by} {item.time} <span onClick={() => this.fold(item)}>[-]</span>{' '}
                    </div>
                    {item.isFold && (
                        <div className="content">
                            <div>{item.text}</div>
                            <div onClick={() => this.reply(item)}>reply</div>
                            {item.replyStats && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="请回复吧"
                                        value={commitValue}
                                        onChange={(event) => this.saveValue('commitValue', event)}
                                    />
                                    <button onClick={() => this.submitReply(item)}>ok</button>
                                </div>
                            )}

                            {this.renderList(item.child)}
                        </div>
                    )}
                </div>
            );
        });
    };

    saveValue = (type, event) => {
        switch (type) {
            case 'list':
                this.setState({
                    textValue: event.target.value,
                });
                break;
            case 'commitValue':
                this.setState({
                    commitValue: event.target.value,
                });
                break;
            default:
                break;
        }
    };

    fold = (item) => {
        item.isFold = !item.isFold;
        this.forceUpdate();
    };

    reply = (item) => {
        item.replyStats = !item.replyStats;
        this.forceUpdate();
    };

    submitReply = (item) => {
        const { commitValue } = this.state;

        item.child.push({
            text: commitValue,
            by: String(),
            time: formatDateTime(),
            isFold: true,
            child: [],
            replyStats: false,
            id: uuid(),
        });
        item.replyStats = false;
        this.setState({ commitValue: '' });
    };

    render() {
        const { list, textValue, commitValue } = this.state;

        return (
            <div>
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    value={textValue}
                    onChange={(event) => this.changeInput('list', event)}
                ></textarea>
                <button onClick={() => this.addComment()}>add comment</button>

                <div>
                    {/* 两种渲染方法 */}

                    {/* 方法1 */}
                    {this.renderList(list)}

                    {/* 方法2 */}
                    {/* {list.map((item, i) => {
            return (
              <div key={item.id} style={{ marginBottom: "50px" }}>
                <div>
                  {item.by} {item.time}
                  <button onClick={() => this.foldList(item.id)}>[-]</button>
                </div>

                <div className={item.isFold ? style.content : style.none}>
                  <div>{item.text}</div>
                  <div onClick={() => this.isReply(item.id)}>reply</div>

                  {item.replyStats && (
                    <div>
                      <input  
                        type="text"
                        placeholder="请回复吧"
                        value={commitValue}
                        onChange={(event) =>
                          this.changeInput("commitValue", event)
                        }
                      />
                      <button onClick={() => this.replyFist(item.id)}>
                        ok
                      </button>
                    </div>
                  )}

                  {this.showChildDOM(item.child)}
                </div>
              </div>
            );
          })} */}
                </div>
            </div>
        );
    }
}

export default TextArea;
