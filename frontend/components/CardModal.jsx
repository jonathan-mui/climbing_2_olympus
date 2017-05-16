import React from 'react';

class CardModal extends React.PureComponent {
  render() {
    if (!this.props.instructions) return null;
    return (
      <div className="overlay">
        <div className="modal">
          <div className="modal--body modal--body-card">
            <i className="icon ion-close icon-close" onClick={this.props.closeModal} />
            <div className="playerModal--body">
              <img src="../images/purplestar.png" className="modal--icon"/>
              {this.props.instructions}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CardModal;
