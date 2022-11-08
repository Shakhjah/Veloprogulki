const React = require('react');

module.exports = function Modal({ children }) {
  return (
    // Modal Войти
    <>
      <div className="modal fade" id="signInModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Войти</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <form action="/auth/in" method="post" id="signInForm">

              <div className="modal-body">
                <label className="title-text">
                  Email
                  <input name="setEmail" className="form-control" type="email" required="true" placeholder="email@email.com" autoComplete="off" />
                </label>
                <br />
                <label className="title-text">
                  Password
                  <input name="setPassword" className="form-control" type="password" required="true" placeholder="password" />
                </label>
                <div className="modal-footer">
                  <button name="modalClose" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button name="modalSaveChange" type="submit" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    // Modal Регистрация
      <div className="modal fade" id="signUpModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Регистрация</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <form action="/" method="post">
              <div className="modal-body">
                <label className="title-text">
                  Name
                  <input name="setName" className="form-control" type="text" autoComplete="off" />
                </label>
                <br />
                <label className="title-text">
                  Email
                  <input name="setEmail" className="form-control" type="email" autoComplete="off" />
                </label>
                <br />
                <label className="title-text">
                  Password
                  <input name="setPassword" className="form-control" type="password" />
                </label>
              </div>
              <div className="modal-footer">
                <button name="modalClose" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button name="modalSaveChange" type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}