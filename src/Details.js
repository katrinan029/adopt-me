import React from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
// import Modal from "./Modal";

import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary.js";
import ThemeContext from "./ThemeContext";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      // showModal: false,
    };
  }
  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        url: animal.url,
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }
  // toggleModal() {
  //   return this.setState((this.state.showModal = true));
  // }
  // adopt() {
  //   return navigate(this.state.url);
  // }
  render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }

    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      url,
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {(themeHook) => (
              <a href={url}>
                <button style={{ backgroundColor: themeHook[0] }}>
                  Adopt {name}
                </button>
              </a>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
