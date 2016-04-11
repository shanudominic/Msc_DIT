package com.parser;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import com.parser.object.Array;
import com.parser.object.Dict;
import com.parser.object.Key;
import com.parser.object.ObjectFactory;
import com.parser.object.Plist;

public class Demo {

	public static void main(String[] args) throws JAXBException {
		
		String libraryId = null;
		List<Object> rootTracks = null;
		List<Object> rootPlaylists = null;
		ArrayList<String> artist1 = new ArrayList<String>();
		
		
		JAXBContext jaxbContext = JAXBContext.newInstance(ObjectFactory.class);
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		Plist plist = (Plist) unmarshaller.unmarshal(new File("iTunes Music Library1.xml"));
		List<Object> rootObject = plist.getArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse();
		Dict rootDict = (Dict) rootObject.get(0);
		List<Object> childofRootDict= rootDict.getKeyOrArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse();
		
		for(int i=0; i<childofRootDict.size(); i++){
			if(childofRootDict.get(i).getClass().getName().contains("Key")){
				if(((Key)childofRootDict.get(i)).getvalue().equals("Library Persistent ID")){
					libraryId = ((com.parser.object.String)childofRootDict.get(i+1)).getvalue();
				}
			}
			else if(childofRootDict.get(i).getClass().getName().equals("com.parser.object.Dict")){
				Dict track = (Dict) childofRootDict.get(i);
				rootTracks = track.getKeyOrArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse();
			}
			else if(childofRootDict.get(i).getClass().getName().equals("com.parser.object.Array")){
				Array playList = (Array) childofRootDict.get(i);
				rootPlaylists = playList.getArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse();
			}
		}
		System.out.println("Library ID: "+libraryId);
		
		for(Object tracks: rootTracks){
			if(tracks.getClass().getName().contains("Dict")){
				Integer trackId = null;
				String name = null;
				String artist = null;
				String composer = null;
				String album = null;
				String genre = null;
				Dict tracks1 = (Dict) tracks;
				List<Object> childofTracks = tracks1.getKeyOrArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse();
				for(int i=0; i<childofTracks.size();i++){
					if(childofTracks.get(i).getClass().getName().contains("Key") && ((Key)childofTracks.get(i)).getvalue().equals("Track ID")){
						trackId = Integer.parseInt(((com.parser.object.Integer)childofTracks.get(i+1)).getvalue());
					}
					else if(childofTracks.get(i).getClass().getName().contains("Key") && ((Key)childofTracks.get(i)).getvalue().equals("Name")){
						name = ((com.parser.object.String)childofTracks.get(i+1)).getvalue();
					}
					else if(childofTracks.get(i).getClass().getName().contains("Key") && ((Key)childofTracks.get(i)).getvalue().equals("Artist")){
						artist = ((com.parser.object.String)childofTracks.get(i+1)).getvalue();
					}
					else if(childofTracks.get(i).getClass().getName().contains("Key") && ((Key)childofTracks.get(i)).getvalue().equals("Composer")){
						composer = ((com.parser.object.String)childofTracks.get(i+1)).getvalue();
					}
					else if(childofTracks.get(i).getClass().getName().contains("Key") && ((Key)childofTracks.get(i)).getvalue().equals("Album")){
						album = ((com.parser.object.String)childofTracks.get(i+1)).getvalue();
					}
					else if(childofTracks.get(i).getClass().getName().contains("Key") && ((Key)childofTracks.get(i)).getvalue().equals("Genre")){
						genre = ((com.parser.object.String)childofTracks.get(i+1)).getvalue();
					}
				}
				System.out.println("***********************************");
				System.out.println("Track ID: "+trackId);
				System.out.println("Track name: "+name);
				System.out.println("Artist: "+artist);
				System.out.println("Composer: "+composer);
				System.out.println("Album: "+album);
				System.out.println("Genre: "+genre);
				artist1.add(artist);
			}
		}
		System.out.println("No of Tracks: "+artist1.size());
		
		for(Object playlists: rootPlaylists){
			String playlistName = null;
			Integer playlistId = null;
			Integer playlistTrackId = null;
			Dict playDict = (Dict)playlists;
			List<Object> playDicts = playDict.getKeyOrArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse();
			for(int i=0; i<playDicts.size(); i++){
				if(playDicts.get(i).getClass().getName().contains("Key") && ((Key)playDicts.get(i)).getvalue().equals("Name")){
					playlistName = ((com.parser.object.String)playDicts.get(i+1)).getvalue();
				}
				else if(playDicts.get(i).getClass().getName().contains("Key") && ((Key)playDicts.get(i)).getvalue().equals("Playlist ID")){
					playlistId = Integer.parseInt(((com.parser.object.Integer)playDicts.get(i+1)).getvalue());
				}
				else if(playDicts.get(i).getClass().getName().contains("Array")){
					List<Object> playlistArray = ((Array)playDicts.get(i)).getArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse();
					for(int j=0; j<playlistArray.size(); j++){
						playlistTrackId = Integer.parseInt(((com.parser.object.Integer)((Dict)playlistArray.get(j)).getKeyOrArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse().get(1)).getvalue());
						System.out.println(playlistTrackId);
					}
				}
			}
			System.out.println("PlayList ID: "+playlistId);
			System.out.println("PlayList Name: "+playlistName);
		}
	}

}
