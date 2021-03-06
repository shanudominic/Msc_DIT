package services;

import java.util.Collection;
import java.util.List;

import javax.ejb.Local;

import entities.PlayList;
import entities.PlaylistTracks;
import entities.Track;
import entities.User1;
import entities.UserLibrary;

@Local
public interface Service {
	public void addUserLibrary(UserLibrary library);
	public void addTracks(Collection<Track> tracks);
	public void addTrack(Track track);
	public void addPlayList(PlayList playlist);
	public void addPlaylistSongs(Collection<PlaylistTracks> playlistSongs);
	public void addPlayListTrack(PlaylistTracks playListTrack);
	
	public void removeUser(User1 user);
	public void removeUserLibrary(UserLibrary library);
	public void removeTrack(Track track);
	public void removePlayList(PlayList playlist);
	public void removePlayListTrack(PlaylistTracks playListTrack);
	
	public boolean login(String username, String password);
	public void addUser(User1 user);
	public boolean checkUserExistence(String username);
	public List<Object[]> getAllPlaylistTracks(String username);
	public Collection<UserLibrary> getUserLibraries(String username);
	public Collection<PlayList> getDevicePlaylist(String deviceId);
	public List<Object[]> getPlayListTracks(Integer playlistId);
	public Integer updatePlayList(Integer PlaylistId, String PlayListName);
	public void deleteTrack(String trackId);
	public void deletePlaylist(Integer playlistID);
	public void moveTrack(String FplaylistID, Integer TplaylistID, String trackID);
	public Collection<Track> getUserTracks(String username);
}
