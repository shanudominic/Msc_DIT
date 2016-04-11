package jaxRS;

import java.util.Collection;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import services.Service;
import entities.PlaylistTracks;
import entities.User1;

@Path("/user")
@Stateless
public class UserCrud {
	
	@Inject 
	private Service service;
	
	public UserCrud() {}
	
	@Path("/getAllPlayListTracks/")
//	@GET
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Object[]> getAll(String[] data) {
		String username = data[0].replace("\"", "");
		return service.getAllPlaylistTracks(username);
	}
	
	@Path("/login/")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public boolean login(User1 user) {
		String username = user.getUsername();
		String password = user.getPassword();
		return service.login(username, password);
	}
	
	@Path("/checkUserExistence")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public boolean checkUserExistence(String username){
		return service.checkUserExistence(username);
	}
	
	@Path("/register/")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void register(User1 user) {
		service.addUser(user);
	}
}
