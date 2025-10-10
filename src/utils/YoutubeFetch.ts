export const fetchVideosFromYoutube = async function(): Promise<{id: string, title: string, description: string}[]> {
  const channelData = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?${
    new URLSearchParams({
      part: 'contentDetails',
      id: 'UC43qUeRazy1kxbzKpsXKt-w',
      key: 'AIzaSyAl7UqrY7PHlbGhNfHXqdQrzTw4AKb0gf0',
    })
  }`).then(resp => resp.json())
  let pageToken: string = '';
  let morePages = true;
  const videos = [];
  while(morePages){
    const data = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?${
      new URLSearchParams({
        part: 'snippet',
        playlistId: channelData.items[0].contentDetails.relatedPlaylists.uploads,
        key: 'AIzaSyAl7UqrY7PHlbGhNfHXqdQrzTw4AKb0gf0',
        pageToken: pageToken,
      })
    }`).then(resp => resp.json())
    videos.push(...data.items)
    if(data.nextPageToken){
      pageToken = data.nextPageToken
    } else {
      morePages = false;
    }
  }
  return(videos.map((video) => {return {
    id: video.snippet.resourceId.videoId,
    title: video.snippet.title,
    description: video.snippet.description,
  }}))
}