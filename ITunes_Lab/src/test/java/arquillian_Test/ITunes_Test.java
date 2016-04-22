package arquillian_Test;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNotSame;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ArchivePaths;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.junit.Test;
import org.junit.runner.RunWith;

import services.Service;
import services.ServiceEJB;
import dao.DAO;
import dao.jpa.JPA;
import entities.PlayList;
import entities.PlaylistTracks;
import entities.Track;
import entities.User1;
import entities.UserLibrary;

@RunWith(Arquillian.class)
public class ITunes_Test {

	@Inject
	Service service;
	
	@PersistenceContext
	EntityManager em;
	
	private User1 user,user1;
	private UserLibrary library,library1;
	private PlaylistTracks playlistTracks,playlistTracks1;
	private Track track,track1;
	private PlayList playlist,playlist1;

	@Deployment
	public static JavaArchive createDeployment() {
		return ShrinkWrap
				.create(JavaArchive.class, "test.jar")
				.addPackage(ServiceEJB.class.getPackage())
				.addPackage(PlaylistTracks.class.getPackage())
				.addPackage(JPA.class.getPackage())
				.addPackage(DAO.class.getPackage())
				.addAsManifestResource(EmptyAsset.INSTANCE,
						ArchivePaths.create("beans.xml"))
				.addAsManifestResource("META-INF/persistence.xml",
						"persistence.xml");
	}

	
	public void addToDB() {
		user = new User1("TEST", "1234");
		library = new UserLibrary("234ED52TYU89", user);
		track = new Track("TEST", 0000, "TEST", "TEST", "TEST", "TEST", "TEST");
		playlist = new PlayList(0000, "TEST", library);
		playlistTracks = new PlaylistTracks(playlist, track);	
		
		service.addUser(user);
		service.addUserLibrary(library);
		service.addTrack(track);
		service.addPlayList(playlist);
		service.addPlayListTrack(playlistTracks);
	}
	
	public void removeFromDB() {
		service.removeTrack(track);
		service.removeUserLibrary(library);
		service.removeUser(user);
	}
	
	@Test
	public void testInsert() {
		addToDB();
		
		user1 = em.find(User1.class, "TEST");
		library1 = em.find(UserLibrary.class, "234ED52TYU89");
		track1 = em.find(Track.class, "TEST");
		playlist1 = em.find(PlayList.class, 0000);
		playlistTracks1 = em.find(PlaylistTracks.class, 0000+""+"TEST");
		
		testUser();
		testUserLibrary();
		testPlaylist();
		testTrack();
		testPlayListTrack();
		
		removeFromDB();
	}
	
	public void testUser(){
		assertNotNull(user1.getUsername());
		assertEquals("TEST", user1.getUsername());
		assertNotSame((String)"test", user1.getUsername());
		assertNotNull(user1.getPassword());
		assertEquals("1234", user1.getPassword());
		assertNotSame((String)"test", user1.getPassword());
	}
	
	public void testUserLibrary(){	
		assertNotNull(library1.getUniqueId());
		assertEquals("234ED52TYU89",library1.getUniqueId());
		assertNotSame((String)"testing", library1.getUniqueId());
		
		assertNotNull(library1.getUser());
		assertEquals("TEST",library1.getUser().getUsername());
		assertNotSame((String)"test", library1.getUser().getPassword());
	}
	
	public void testPlaylist(){		
		assertNotNull(playlist1.getPlaylistId());
		assertEquals((Integer)0000, playlist1.getPlaylistId());
		assertNotSame((Integer)99, playlist1.getPlaylistId());
		
		assertNotNull(playlist1.getPlaylistName());
		assertEquals("TEST",playlist1.getPlaylistName());
		assertNotSame((String)"test", playlist1.getPlaylistName());
		
		assertNotNull(playlist1.getLibrary());
		assertEquals("234ED52TYU89",playlist1.getLibrary().getUniqueId());
		assertNotSame((String)"testing",playlist1.getLibrary().getUniqueId());
	}
	
	public void testTrack(){
		assertNotNull(track1.getTrackPK());
		assertEquals("TEST", track1.getTrackPK());
		assertNotSame((String)"test", track1.getTrackPK());
		
		assertNotNull(track1.getTrackId());
		assertEquals((Integer)0000, track1.getTrackId());
		assertNotSame((Integer)99, track1.getTrackId());
		
		assertNotNull(track1.getTrackName());
		assertEquals("TEST", track1.getTrackName());
		assertNotSame((String)"test", track1.getTrackName());
		
		assertNotNull(track1.getAlbum());
		assertEquals("TEST", track1.getAlbum());
		assertNotSame((String)"test", track1.getAlbum());
		
		assertNotNull(track1.getArtist());
		assertEquals("TEST", track1.getArtist());
		assertNotSame((String)"test", track1.getArtist());
		
		assertNotNull(track1.getComposer());
		assertEquals("TEST", track1.getComposer());
		assertNotSame((String)"test", track1.getComposer());
		
		assertNotNull(track1.getGenre());
		assertEquals("TEST", track1.getGenre());
		assertNotSame((String)"test", track1.getGenre());
	}

	public void testPlayListTrack(){
		assertNotNull(playlistTracks1.getPlaylistSongId());
		assertEquals((String)(0000+""+"TEST"), playlistTracks1.getPlaylistSongId());
		assertNotSame((String)(99+""+"test"), playlistTracks1.getPlaylistSongId());
		
		assertNotNull(playlistTracks1.getTrack().getTrackPK());
		assertEquals("TEST", playlistTracks1.getTrack().getTrackPK());
		assertNotSame((String)"test", playlistTracks1.getTrack().getTrackPK());
		
		assertNotNull(playlistTracks1.getPlayList().getPlaylistId());
		assertEquals((Integer)0000, playlistTracks1.getPlayList().getPlaylistId());
		assertNotSame((Integer)99,playlistTracks1.getPlayList().getPlaylistId());
	}
}
