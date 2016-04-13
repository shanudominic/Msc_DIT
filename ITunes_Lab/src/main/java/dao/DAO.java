package dao;

import java.util.Collection;
import java.util.List;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import entities.PlayList;
import entities.PlaylistTracks;
import entities.Track;
import entities.User1;
import entities.UserLibrary;

@Local
@Stateless
@TransactionAttribute(TransactionAttributeType.REQUIRED)
public interface DAO {
	void addUserLibrary(UserLibrary library);
	void addTracks(Collection<Track> tracks);
	void addPlayList(PlayList playlist);
	void addPlaylistSongs(Collection<PlaylistTracks> playlistSongs);
	
	boolean login(String username, String password);
	void addUser(User1 user);
	boolean checkUserExistence(String username);
	List<Object[]> getAllPlaylistTracks(String username);
	Collection<UserLibrary> getUserLibraries(String username);
	Collection<PlayList> getDevicePlaylist(String deviceId);
	Collection<PlaylistTracks> getPlayListTracks(Integer playlistId);
}
