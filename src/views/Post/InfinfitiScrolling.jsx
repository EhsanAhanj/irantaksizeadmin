import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RawPostCard from "./RawPostCard";

class InfinfitiScrolling extends React.Component {
  state = {
    items: Array.from({ length: 20 }),
    hasMore: true,
  };

  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 })),
      });
    }, 500);
  };

  render() {
    return (
      <div className="animated fadeIn">
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {this.state.items.map((i, index) => (
            <RawPostCard key={index} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
export default InfinfitiScrolling;
