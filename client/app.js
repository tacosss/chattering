// const React = require('react');
// const ReactDOM = require('react-dom');
// const io = require('socket.io-client');
// const axios = require('axios');
// const socket = io.connect();

// // UsersList Component
// class UsersList extends React.Component {
//     render() {
//         return (
//             <div className="users">
//                 <h3> 참여자들 </h3>
//                 <ul>
//                     {this.props.users.map((user, i) => (
//                         <li key={i}>{user}</li>
//                     ))}
//                 </ul>
//             </div>
//         );
//     }
// }

// // Message Component
// class Message extends React.Component {
//     render() {
//         return (
//             <div className="message">
//                 <strong>{this.props.user} :</strong> <span>{this.props.text}</span>
//             </div>
//         );
//     }
// }

// // MessageList Component
// class MessageList extends React.Component {
//     render() {
//         return (
//             <div className="messages">
//                 <h2> 채팅방 </h2>
//                 {this.props.messages.map((message, i) => (
//                     <Message key={i} user={message.user} text={message.text} />
//                 ))}
//             </div>
//         );
//     }
// }

// // MessageForm Component
// class MessageForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { text: '' };
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         const message = {
//             user: this.props.user,
//             text: this.state.text,
//         };
//         this.props.onMessageSubmit(message);
//         this.setState({ text: '' });
//     };

//     render() {
//         return (
//             <div className="message_form">
//                 <form onSubmit={this.handleSubmit}>
//                     <input
//                         placeholder="메시지 입력"
//                         className="textinput"
//                         onChange={(e) => this.setState({ text: e.target.value })}
//                         value={this.state.text}
//                     />
//                     <h3></h3>
//                 </form>
//             </div>
//         );
//     }
// }

// // ChangeNameForm Component
// class ChangeNameForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { newName: '' };
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         const newName = this.state.newName;
//         this.props.onChangeName(newName);
//         this.setState({ newName: '' });
//     };

//     render() {
//         return (
//             <div className="change_name_form">
//                 <h3> 아이디 변경 </h3>
//                 <form onSubmit={this.handleSubmit}>
//                     <input
//                         placeholder="변경할 아이디 입력"
//                         onChange={(e) => this.setState({ newName: e.target.value })}
//                         value={this.state.newName}
//                     />
//                 </form>
//             </div>
//         );
//     }
// }

// // LoginForm Component
// class LoginForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { username: '', password: '', error: '' };
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('/login', {
//             username: this.state.username,
//             password: this.state.password,
//         })
//             .then(response => {
//                 this.props.onLogin(response.data.user);
//             })
//             .catch(error => {
//                 this.setState({ error: error.response.data.message });
//             });
//     };

//     render() {
//         return (
//             <div>
//                 <h2>로그인</h2>
//                 <form onSubmit={this.handleSubmit}>
//                     <input
//                         type="text"
//                         placeholder="아이디"
//                         value={this.state.username}
//                         onChange={(e) => this.setState({ username: e.target.value })}
//                     />
//                     <input
//                         type="password"
//                         placeholder="비밀번호"
//                         value={this.state.password}
//                         onChange={(e) => this.setState({ password: e.target.value })}
//                     />
//                     <button type="submit">로그인</button>
//                     {this.state.error && <p>{this.state.error}</p>}
//                 </form>
//             </div>
//         );
//     }
// }

// // RegisterForm Component
// class RegisterForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { username: '', password: '', error: '' };
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('/register', {
//             username: this.state.username,
//             password: this.state.password,
//         })
//             .then(response => {
//                 this.props.onRegister(this.state.username);
//             })
//             .catch(error => {
//                 this.setState({ error: error.response.data.message });
//             });
//     };

//     render() {
//         return (
//             <div>
//                 <h2>회원가입</h2>
//                 <form onSubmit={this.handleSubmit}>
//                     <input
//                         type="text"
//                         placeholder="아이디"
//                         value={this.state.username}
//                         onChange={(e) => this.setState({ username: e.target.value })}
//                     />
//                     <input
//                         type="password"
//                         placeholder="비밀번호"
//                         value={this.state.password}
//                         onChange={(e) => this.setState({ password: e.target.value })}
//                     />
//                     <button type="submit">회원가입</button>
//                     {this.state.error && <p>{this.state.error}</p>}
//                 </form>
//             </div>
//         );
//     }
// }

// // ChatApp Component
// class ChatApp extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             users: [],
//             messages: [],
//             user: '',
//             isLoggedIn: false,
//             isRegistering: false,
//         };
//     }

//     componentDidMount() {
//         socket.on('init', this.initialize);
//         socket.on('send:message', this.messageReceive);
//         socket.on('user:join', this.userJoined);
//         socket.on('user:left', this.userLeft);
//         socket.on('change:name', this.userChangedName);
//     }

//     initialize = (data) => {
//         this.setState({ users: data.users, user: data.name });
//     };

//     messageReceive = (message) => {
//         this.setState((prevState) => ({
//             messages: [...prevState.messages, message],
//         }));
//     };

//     handleMessageSubmit = (message) => {
//         this.setState((prevState) => ({
//             messages: [...prevState.messages, message],
//         }));
//         socket.emit('send:message', message);
//     };

//     handleChangeName = (newName) => {
//         const oldName = this.state.user;
//         socket.emit('change:name', { name: newName }, (result) => {
//             if (!result) {
//                 return alert('There was an error changing your name');
//             }
//             this.setState((prevState) => ({
//                 users: prevState.users.map((u) => (u === oldName ? newName : u)),
//                 user: newName,
//             }));
//         });
//     };

//     userJoined = (data) => {
//         this.setState((prevState) => ({
//             users: [...prevState.users, data.name],
//         }));
//     };

//     userLeft = (data) => {
//         this.setState((prevState) => ({
//             users: prevState.users.filter((u) => u !== data.name),
//         }));
//     };

//     userChangedName = (data) => {
//         this.setState((prevState) => ({
//             users: prevState.users.map((u) => (u === data.oldName ? data.newName : u)),
//         }));
//     };

//     handleLogin = (user) => {
//         this.setState({ user: user.username, isLoggedIn: true });
//         socket.emit('user:join', { name: user.username });
//     };

//     handleRegister = (username) => {
//         this.setState({ user: username, isLoggedIn: true });
//         socket.emit('user:join', { name: username });
//     };

//     render() {
//         return (
//             <div>
//                 {!this.state.isLoggedIn ? (
//                     <div>
//                         {this.state.isRegistering ? (
//                             <RegisterForm onRegister={this.handleRegister} />
//                         ) : (
//                             <LoginForm onLogin={this.handleLogin} />
//                         )}
//                         <button onClick={() => this.setState({ isRegistering: !this.state.isRegistering })}>
//                             {this.state.isRegistering ? '로그인 화면으로' : '회원가입 화면으로'}
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="center">
//                         <UsersList users={this.state.users} />
//                         <ChangeNameForm onChangeName={this.handleChangeName} />
//                         <MessageList messages={this.state.messages} />
//                         <MessageForm onMessageSubmit={this.handleMessageSubmit} user={this.state.user} />
//                     </div>
//                 )}
//             </div>
//         );
//     }
// }

// export default ChatApp;