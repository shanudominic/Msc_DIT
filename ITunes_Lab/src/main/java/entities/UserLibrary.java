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
@Table(name = "UserLibrary")

public class UserLibrary implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "libraryId")
	private String uniqueId;
	
	@ManyToOne
	@JoinColumn(name="username", referencedColumnName="username")
	private User1 user;
	
	// adding bi-directional relationship
	@OneToMany(orphanRemoval=true, mappedBy = "library")
	private List<PlayList> playlist;

	public UserLibrary() {}

	public UserLibrary(String uniqueId, User1 user) {
		this.uniqueId = uniqueId;
		this.user = user;
	}

	public String getUniqueId() {
		return uniqueId;
	}

	public void setUniqueId(String username) {
		this.uniqueId = username;
	}

	public User1 getUser() {
		return user;
	}

	public void setUser(User1 user) {
		this.user = user;
	}
}
