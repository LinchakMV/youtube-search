import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import VideoList from './VideoList';
import SearchBar from './SearchBar';
import VideoDetail from './VideoDetail';

import _ from 'lodash';

const API_KEY = 'AIzaSyAuzwgYXhyQ_sS_BjBh2yrd5atv7rlGoHo';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            videos:[],
            selectedVideo: null
        };
        this.videoSearch('surfboards');

    }

    videoSearch(term){
        YTSearch({key: API_KEY, term:term}, (videos)=>{
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }
}

export default App;
