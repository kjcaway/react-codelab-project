import React from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest  } from 'actions/authentication';

// 이거 쓰니깐 withRouter로 REDUX문을 감싸 route 변경시 route의 속성 match,location,history를 가져와 컴포넡트 다시 렌더링 가능
import { withRouter } from 'react-router-dom';

class Top extends React.Component {

  constructor(props) {
      super(props);
      this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
      // get cookie by name
      function getCookie(name) {
          var value = "; " + document.cookie;
          var parts = value.split("; " + name + "=");
          if (parts.length == 2) return parts.pop().split(";").shift();
      }

      // get loginData from cookie
      let loginData = getCookie('key');

      // if loginData is undefined, do nothing
      if(typeof loginData === "undefined") return;

      // decode base64 & parse json
      loginData = JSON.parse(atob(loginData));

      // if not logged in, do nothing
      if(!loginData.isLoggedIn) return;

      // page refreshed & has a session in cookie,
      // check whether this cookie is valid or not
      this.props.getStatusRequest().then(
          () => {
              console.log(this.props.status);
              // if session is not valid
              if(!this.props.status.valid) {
                  // logout the session
                  loginData = {
                      isLoggedIn: false,
                      username: ''
                  };
                  
                  document.cookie='key=' + btoa(JSON.stringify(loginData));

                  // and notify
                  let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                  Materialize.toast($toastContent, 4000);

              }
          }
      );
  }

  // 컴포넌트 리렌더링 마친후 실행
  componentDidUpdate(prevProps, prevState){
      console.log("componentDidUpdate: " + JSON.stringify(prevProps) + " " + JSON.stringify(prevState));
  }

  handleLogout() {
      this.props.logoutRequest().then(
          () => {
              Materialize.toast('Good Bye!', 2000);

              // EMPTIES THE SESSION
              let loginData = {
                  isLoggedIn: false,
                  username: ''
              };

              document.cookie = 'key=' + btoa(JSON.stringify(loginData));
          }
      );
  }

  render(){
      const { match, location, history } = this.props;
      let re = /(login|register)/;
      let isAuth = re.test(location.pathname);
      

      return (
        <div>
          {isAuth ? undefined:<Header isLoggedIn={this.props.status.isLoggedIn} onLogout={this.handleLogout}/>}

        </div>

      );
  }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};

//const TopwWithRouter = withRouter(Top);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Top));
