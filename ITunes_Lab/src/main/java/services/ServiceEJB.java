package services;

import java.util.Collection;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import dao.DAO;
import entities.PlayList;
import entities.PlaylistTracks;
import entities.Track;
import entities.User1;
import entities.UserLibrary;

@Stateless
public class ServiceEJB implements Service{

	@Inject
	private DAO dao;
	
	@Override
	public void addUserLibrary(UserLibrary library) {
		dao.addUserLibrary(library);
	}

	@Override
	public void addTracks(Collection<Track> tracks) {
		dao.addTracks(tracks);
	}

	@Override
	public void addPlayList(PlayList playlist) {
		dao.addPlayList(playlist);
	}

	@Override
	public void addPlaylistSongs(Collection<PlaylistTracks> playlistSongs) {
		dao.addPlaylistSongs(playlistSongs);
	}

	@Override
	public boolean login(String username, String password) {
		return dao.login(username, password);
	}

	@Override
	public boolean checkUserExistence(String username) {
		return dao.checkUserExistence(username);
	}

	@Override
	public void addUser(User1 user) {
		dao.addUser(user);
	}

	@Override
	public List<Object[]> getAllPlaylistTracks(String username) {
		return dao.getAllPlaylistTracks(username);
	}

	@Override
	public Collection<UserLibrary> getUserLibraries(String username) {
		return dao.getUserLibraries(username);
	}

	@Override
	public Collection<PlayList> getDevicePlaylist(String deviceId) {
		return dao.getDevicePlaylist(deviceId);
	}

	@Override
	public List<Object[]> getPlayListTracks(Integer playlistId) {
		return dao.getPlayListTracks(playlistId);
	}

	@Override
	public Integer updatePlayList(Integer PlaylistId, String PlayListName) {
		return dao.updatePlayList(PlaylistId, PlayListName);
	}

	@Override
	public void deleteTrack(String trackId) {
		dao.deleteTrack(trackId);
	}

	@Override
	public Collection<Track> getUserTracks(String username) {
		return dao.getUserTracks(username);
	}

	@Override
	public void deletePlaylist(Integer playlistID) {
		dao.deletePlaylist(playlistID);
	}

	@Override
	public void moveTrack(String FplaylistID, Integer TplaylistID,	String trackID) {
		dao.moveTrack(FplaylistID, TplaylistID, trackID);
	}

}
