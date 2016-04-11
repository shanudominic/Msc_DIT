package entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "PlaylistTrack")
public class PlaylistTracks implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "PlaylistTrackId")
	private String playlistSongId;
	
	@ManyToOne
	@JoinColumn(name = "playlistId", referencedColumnName = "playlistId")
	private PlayList playList;

	// one to one mapping with track
	@ManyToOne
	@JoinColumn(name = "trackId", referencedColumnName = "trackId")
	private Track track;

	public PlaylistTracks() {}

	public PlaylistTracks(PlayList playList, Track track) {
		this.playlistSongId = playList.getPlaylistId()+""+track.getTrackId();
		this.playList = playList;
		this.track = track;
	}

	public String getPlaylistSongId() {
		return playlistSongId;
	}

	public void setPlaylistSongId(String playlistSongId) {
		this.playlistSongId = playlistSongId;
	}

	public PlayList getPlayList() {
		return playList;
	}

	public void setPlayList(PlayList playList) {
		this.playList = playList;
	}

	public Track getTrack() {
		return track;
	}

	public void setTrack(Track track) {
		this.track = track;
	}
	
	
}
