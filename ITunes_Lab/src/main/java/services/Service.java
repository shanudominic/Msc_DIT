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
	public void addPlayList(PlayList playlist);
	public void addPlaylistSongs(Collection<PlaylistTracks> playlistSongs);
	
	public boolean login(String username, String password);
	public void addUser(User1 user);
	public boolean checkUserExistence(String username);
	public List<Object[]> getAllPlaylistTracks(String username);
	public Collection<UserLibrary> getUserLibraries(String username);
	public Collection<PlayList> getDevicePlaylist(String deviceId);

}
