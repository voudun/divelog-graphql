import rp from 'request-promise';
import errors from 'request-promise/errors';

export function getArticles() {
  return rp({
    uri: 'http://www.metronieuws.nl/api/articles',
    transform: (data) => {
      return JSON.parse(data)
    }
  }).then(res => {
    return res.map(r => {
      return {
        id: parseInt(r.nid, 10),
        title: r.title,
        author: r.author,
        url: r.url,
        image: [{
          mobile_tab_photos: r.image.mobile_tab_photos,
          mobile_top_stories: r.image.mobile_top_stories,
          high_res: r.image.high_res,
          caption: r.image.caption
        }],
        comment_count: r.comment_count
      };
    });
  }).catch(errors.StatusCodeError, () => {
    console.error('error #%d', reason.statusCode);
  });
}