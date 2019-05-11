// import React from "react";
// import { connect } from "react-redux";
// import { search, closeSearchResults } from "./actions";
// import { Link } from "react-router-dom";

// class SearchBox extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             searchText: ""
//         };
//         this.eventListener = this.eventListener.bind(this);
//     }

//     eventListener() {
//         this.props.closeSearchResults();
//         this.setState({
//             searchText: ""
//         });
//     }

//     componentDidMount() {
//         document.body.addEventListener("click", this.eventListener);
//     }

//     componentWillUnmount() {
//         document.body.removeEventListener("click", this.eventListener);
//     }

//     render() {
//         let noResults;
//         const { results, search, resultsVisible } = this.props;
//         if (results.length === 0) {
//             noResults = <div className="search-no-results">No results</div>;
//         }
//         return (
//             <div className="search-box">
//                 <input
//                     className="search-box-input"
//                     type="text"
//                     placeholder="search"
//                     onChange={e => {
//                         this.setState({
//                             searchText: e.target.value
//                         });
//                         search(e.target.value);
//                     }}
//                     value={this.state.searchText}
//                 />
//                 {resultsVisible && (
//                     <div className="search-results">
//                         {noResults}
//                         {results.map(result => (
//                             <div className="results-list-item" key={result.id}>
//                                 <Link to={`/user/${result.id}`}>
//                                     <img
//                                         className="search-image"
//                                         src={result.users_image}
//                                     />
//                                     <span className="search-result-name">
//                                         {result.first_name}&nbsp;
//                                         {result.last_name}
//                                     </span>
//                                 </Link>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         );
//     }
// }

// const mapStateToProps = state => {
//     return {
//         results: state.searchResults,
//         resultsVisible: state.resultsVisible
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         search(text) {
//             dispatch(search(text));
//         },
//         closeSearchResults() {
//             dispatch(closeSearchResults());
//         }
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(SearchBox);
