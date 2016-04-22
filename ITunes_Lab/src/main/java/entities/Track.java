package entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Track")
public class Track implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "trackPK")
	private String trackPK;
	
	@Column(name = "trackId")
	private Integer trackId;
	
	@Column(name = "trackAlbum")
	private String album;
	
	@Column(name = "trackArtist")
	private String artist;
	
	@Column(name = "trackComposer")
	private String composer;
	
	@Column(name = "trackGenre")
	private String genre;
	
	@Column(name = "trackName")
	private String trackName;
	
	// adding bi-directional relationship
	@OneToMany(cascade={CascadeType.REMOVE,CascadeType.REFRESH}, mappedBy = "playList")
	private List<PlaylistTracks> playlistSongs;

	public Track() {}

	public Track(String trackPK, Integer trackId, String album, String artist,
			String composer, String genre, String trackName) {
		this.trackPK = trackPK;
		this.trackId = trackId;
		this.album = album;
		this.artist = artist;
		this.composer = composer;
		this.genre = genre;
		this.trackName = trackName;
	}

	public String getTrackPK() {
		return trackPK;
	}

	public void setTrackPK(String trackPK) {
		this.trackPK = trackPK;
	}

	public Integer getTrackId() {
		return trackId;
	}

	public void setTrackId(Integer trackId) {
		this.trackId = trackId;
	}

	public String getAlbum() {
		return album;
	}

	public void setAlbum(String album) {
		this.album = album;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getComposer() {
		return composer;
	}

	public void setComposer(String composer) {
		this.composer = composer;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getTrackName() {
		return trackName;
	}

	public void setTrackName(String trackName) {
		this.trackName = trackName;
	}
	
	
	
	
}
