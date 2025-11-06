import axios from 'axios';
import { NASAImage, NASANewsArticle } from '../types';

const NASA_API_KEY = 'DEMO_KEY';

export async function searchNASAImages(query: string): Promise<NASAImage[]> {
  try {
    const response = await axios.get(
      `https://images-api.nasa.gov/search?q=${query}&media_type=image`
    );
    return response.data.collection.items.map((item: any) => ({
      title: item.data[0].title,
      explanation: item.data[0].description,
      url: item.links[0].href,
      media_type: 'image'
    }));
  } catch (error) {
    console.error('Error fetching NASA images:', error);
    return [];
  }
}

export async function getAPOD(): Promise<NASAImage> {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching APOD:', error);
    return {
      title: 'Error loading image',
      explanation: 'Failed to load NASA image of the day',
      url: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413',
      media_type: 'image'
    };
  }
}

export async function getNASANews(): Promise<NASANewsArticle[]> {
  try {
    const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}');
    // Since NASA doesn't have a direct news API, we'll transform APOD data into news format
    return [{
      id: '1',
      title: response.data.title,
      description: response.data.explanation,
      publishedAt: new Date().toISOString(),
      url: 'https://www.nasa.gov/news',
      imageUrl: response.data.url
    }];
  } catch (error) {
    console.error('Error fetching NASA news:', error);
    return [];
  }
}