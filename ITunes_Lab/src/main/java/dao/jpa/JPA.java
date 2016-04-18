package dao.jpa;

import java.util.Collection;
import java.util.List;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import dao.DAO;
import entities.PlayList;
import entities.PlaylistTracks;
import entities.Track;
import entities.User1;
import entities.UserLibrary;

@Stateless
@Local
public class JPA implements DAO{

	@PersistenceContext
	EntityManager em;
	
	@Override
	public void addUserLibrary(UserLibrary library) {
		em.persist(library);
	}

	@Override
	public void addTracks(Collection<Track> tracks) {
		for(Track track:tracks){
			em.merge(track);
		}
	}

	@Override
	public void addPlayList(PlayList playlist) {
			em.persist(playlist);
	}

	@Override
	public void addPlaylistSongs(Collection<PlaylistTracks> playlistSongs) {
		for(PlaylistTracks playlistSong:playlistSongs){
			em.merge(playlistSong);
		}
	}

	@Override
	public boolean login(String username, String password) {
		Query query = em.createQuery("from User1 us where us.username=:Username and us.password=:Password");
		query.setParameter("Username", username);
		query.setParameter("Password", password);
		@SuppressWarnings("unchecked")
		List<User1> result = query.getResultList();
		
		if(result.size() > 0)
			return true;
		else
			return false;
	}

	@Override
	public boolean checkUserExistence(String username) {
		Query query = em.createQuery("from User1 us where us.username=:Username");
		query.setParameter("Username", username);
		@SuppressWarnings("unchecked")
		List<User1> result = query.getResultList();
		
		if(result.size() > 0)
			return false;
		else
			return true;
	}

	@Override
	public void addUser(User1 user) {
		Query query = em.createQuery("from User1");
		@SuppressWarnings("unchecked")
		List<User1> users = query.getResultList();
		if (!users.contains(user))
			em.persist(user);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> getAllPlaylistTracks(String username) {
		Query query = em.createQuery("select pt.track.trackName,pt.track.album,pt.track.artist,pt.track.composer,pt.track.genre from PlaylistTracks pt where pt.playList.library.user.username=:Username");
		query.setParameter("Username", username);
		return (List<Object[]>)query.getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<UserLibrary> getUserLibraries(String username) {
		Query query = em.createQuery("from UserLibrary ul where ul.user.username=:Username");
		query.setParameter("Username", username);
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<PlayList> getDevicePlaylist(String deviceId) {
		Query query = em.createQuery("from PlayList pl where pl.library.uniqueId=:DeviceId");
		query.setParameter("DeviceId", deviceId);
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> getPlayListTracks(Integer playlistId) {
		Query query = em.createQuery("select plt.track.trackPK,plt.track.trackName,plt.track.album,plt.track.artist,plt.track.composer,plt.track.genre from PlaylistTracks plt where plt.playList.playlistId=:PlayListId");
		query.setParameter("PlayListId", playlistId);
		return (List<Object[]>)query.getResultList();
	}

	@Override
	public Integer updatePlayList(Integer PlaylistId, String PlayListName) {
		Query query = em.createQuery("UPDATE PlayList SET playlistName=:PlayListName WHERE playlistId=:PlaylistId");
		query.setParameter("PlayListName", PlayListName);
		query.setParameter("PlaylistId", PlaylistId);
		return query.executeUpdate();
	}

	@Override
	public void deleteTrack(String trackId) {
		Track track = em.find(Track.class, trackId);
		em.remove(track);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Track> getUserTracks(String username) {
		Query query = em.createQuery("select distinct(pt.track) from PlaylistTracks pt where pt.playList.library.user.username=:Username");
		query.setParameter("Username", username);
		return query.getResultList();
	}

	@Override
	public void deletePlaylist(Integer playlistID) {
		PlayList playlist = em.find(PlayList.class, playlistID);
		em.remove(playlist);
	}

	@Override
	public void moveTrack(String FplaylistID, Integer TplaylistID, String trackID) {
		PlaylistTracks track = em.find(PlaylistTracks.class, FplaylistID+""+trackID);
		em.remove(track);
		
		PlaylistTracks temp = new PlaylistTracks(em.find(PlayList.class, TplaylistID), em.find(Track.class, trackID));
		em.merge(temp);
	}

}
