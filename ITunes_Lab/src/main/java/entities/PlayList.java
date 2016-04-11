package entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "Playlist")
public class PlayList implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "playlistId")
	private Integer playlistId;
	
	@Column(name = "playlistName")
	private String playlistName;
	
	@ManyToOne
	@JoinColumn(name = "libraryId", referencedColumnName = "libraryId")
	private UserLibrary library;

	// adding bi-directional relationship
	@OneToMany(cascade=CascadeType.ALL, mappedBy = "playList")
	private List<PlaylistTracks> playlistSongs;

	public PlayList() {}

	public PlayList(Integer playlistId, String playlistName, UserLibrary library) {
		this.playlistId = playlistId;
		this.playlistName = playlistName;
		this.library = library;
	}

	public Integer getPlaylistId() {
		return playlistId;
	}

	public void setPlaylistId(Integer playlistId) {
		this.playlistId = playlistId;
	}

	public String getPlaylistName() {
		return playlistName;
	}

	public void setPlaylistName(String playlistName) {
		this.playlistName = playlistName;
	}

	public UserLibrary getLibrary() {
		return library;
	}

	public void setLibrary(UserLibrary library) {
		this.library = library;
	}

}
