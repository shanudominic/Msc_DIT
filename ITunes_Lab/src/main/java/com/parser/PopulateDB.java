package com.parser;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import com.parser.object.Array;
import com.parser.object.Dict;
import com.parser.object.Key;
import com.parser.object.ObjectFactory;
import com.parser.object.Plist;

import entities.PlayList;
import entities.PlaylistTracks;
import entities.Track;
import entities.User1;
import entities.UserLibrary;
import services.Service;

@Path("/xml")
@Stateless
public class PopulateDB {

	@EJB
	private Service service;

	@PersistenceContext
	EntityManager em;

	@SuppressWarnings("unused")
	private String path = "input.xml";
	private String libraryId = null;
	private List<Object> rootTracks = null;
	private List<Object> rootPlaylists = null;
	private List<Object> childofRootDict = null;
	private Collection<Track> tracks4 = new ArrayList<Track>();
	private Collection<PlaylistTracks> songs = new ArrayList<PlaylistTracks>();
	private String username = null;
	public PopulateDB() {
	}

	// http://localhost:8080/maven_Project/rest/database/populateDB
	@POST
	@Path("/populateDB/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_XML)
	public String populateDB(String[] data) throws JAXBException {
		 libraryId = null;
		String path = data[0].replace("\"", "");
		username = data[1].replace("\"", "");
		
		JAXBContext jaxbContext = JAXBContext.newInstance(ObjectFactory.class);
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		Plist plist = (Plist) unmarshaller.unmarshal(new File(path));
		List<Object> rootObject = plist.getArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse();
		Dict rootDict = (Dict) rootObject.get(0);
		childofRootDict = rootDict.getKeyOrArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse();
		
		getRootChild();
		getTracks();
		getPlaylists();
		
		service.addPlaylistSongs(songs);
		return path;
	}
	private void getRootChild(){
		for(int i=0; i<childofRootDict.size(); i++){
			if(childofRootDict.get(i).getClass().getName().contains("Key")){
				if(((Key)childofRootDict.get(i)).getvalue().equals("Library Persistent ID")){
					libraryId = ((com.parser.object.String)childofRootDict.get(i+1)).getvalue();
				}
			}
			else if(childofRootDict.get(i).getClass().getName().contains("Dict")){
				Dict track = (Dict) childofRootDict.get(i);
				rootTracks = track.getKeyOrArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse();
			}
			else if(childofRootDict.get(i).getClass().getName().contains("Array")){
				Array playList = (Array) childofRootDict.get(i);
				rootPlaylists = playList.getArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse();
			}
		}
//		System.out.println("Library ID: "+libraryId);
		service.addUserLibrary(new UserLibrary(libraryId, em.find(User1.class, username)));
	}

	private void getTracks(){
		for(Object tracks: rootTracks){
			if(tracks.getClass().getName().contains("Dict")){
				Integer trackId = null;
				String name = ""; 
				String artist = "";
				String composer = "";
				String album = "";
				String genre = "";
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
//				System.out.println("***********************************");
//				System.out.println("Track ID: "+trackId);
//				System.out.println("Track name: "+name);
//				System.out.println("Artist: "+artist);
//				System.out.println("Composer: "+composer);
//				System.out.println("Album: "+album);
//				System.out.println("Genre: "+genre);
//				System.out.println(libraryId);
				tracks4.add(new Track((String)(trackId+""+libraryId),trackId, album, artist, composer, genre, name));
			}
		}
		System.out.println("Finished tracks");
		service.addTracks(tracks4);
	}

	private void getPlaylists(){
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
//					System.out.println("PlayList ID: "+playlistId);
//					System.out.println("PlayList Name: "+playlistName);
//					System.out.println("Library ID: "+libraryId);
					service.addPlayList(new PlayList(playlistId, playlistName, em.find(UserLibrary.class, libraryId)));
				}
				else if(playDicts.get(i).getClass().getName().contains("Array")){
					List<Object> playlistArray = ((Array)playDicts.get(i)).getArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse();
					for(int j=0; j<playlistArray.size(); j++){
						playlistTrackId = Integer.parseInt(((com.parser.object.Integer)((Dict)playlistArray.get(j)).getKeyOrArrayOrDataOrDateOrDictOrRealOrIntegerOrStringOrTrueOrFalse().get(1)).getvalue());
						songs.add(new PlaylistTracks(em.find(PlayList.class, playlistId), em.find(Track.class, playlistTrackId+""+libraryId)));
					}
				}
			}
		}
		
		System.out.println("Finished");
	}
}
