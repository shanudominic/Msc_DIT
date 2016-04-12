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

}
