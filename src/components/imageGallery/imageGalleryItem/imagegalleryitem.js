import { Component } from 'react';
import Modal from 'react-modal';
import { GalleryItem, Image } from './imagegalleryitem.styled';

const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: 'none',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
};
Modal.setAppElement('#root');

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };
  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });
  render() {
    const { smallImage, largeImage, description } = this.props;
    return (
      <>
        <GalleryItem>
          <Image src={smallImage} alt={description} onClick={this.openModal} />
        </GalleryItem>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div className="overlay">
            <div className="modal">
              <img
                src={largeImage}
                alt={description}
                width="1000"
                height="800"
              />
            </div>
          </div>
        </Modal>
      </>
    );
  }
}
