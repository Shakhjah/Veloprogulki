const React = require('react');

module.exports = function ModalAddComment({ userId, routeId }) {
  console.log('▶ ⇛ routeIdINMODAL', routeId);
  return (
    // Modal Добавить комментарий
    <div className="modal fade" id="addCommentModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Ваш комментарий</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <form action="/" method="post" id="addCommentIdForm">
            <input name="userId" type="text" value={userId} hidden />
            <input name="routeId" type="text" value={routeId} hidden />
            <div className="modal-body">
              <label className="title-text">
                <p id="commentTitleTextId">Комментарий</p>
                <textarea name="comment" className="form-control" type="text" required="true" autoComplete="off" />
              </label>
              <br />
            </div>
            <div className="modal-footer">
              <button name="modalClose" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button name="modalSaveChange" type="submit" className="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
