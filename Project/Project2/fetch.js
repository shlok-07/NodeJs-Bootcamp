// simply write "node fetch.js (top articles) (page number)"
const top=process.argv[2];
const page=process.argv[3];
const api_url = `https://jsonmock.hackerrank.com/api/articles?page=${page}`;
async function getapi(url) {
    const response = await fetch(url);
    var AllData = await response.json();
    let sortedInput = AllData.data.slice().sort((a, b) => b.num_comments - a.num_comments);
    function topArticles(limit) {
        for (let index = 0; index < limit; index++) {
            if (!sortedInput[index].title && !sortedInput[index].story_title) {
                continue;
            }
            else if (!sortedInput[index].story_title) {
                console.log(sortedInput[index].title);
            }
            else {
                console.log(sortedInput[index].story_title);
            }
        }
    }
    topArticles(top);
}
getapi(api_url);