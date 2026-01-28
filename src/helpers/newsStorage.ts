const STORAGE_KEY = "featured_news";

export function getCachedNews(){
    if(typeof window === "undefined") return null;

    const data = localStorage.getItem(STORAGE_KEY);
    return data? JSON.parse(data): null;
}

export function setCachedNews(news: any[]){
    if(typeof window === "undefined") return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(news));
}