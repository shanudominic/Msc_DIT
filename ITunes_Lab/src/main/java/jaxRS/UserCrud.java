package jaxRS;

import java.util.Collection;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import services.Service;
import entities.PlayList;
import entities.PlaylistTracks;
import entities.User1;
import entities.UserLibrary;

@Path("/user")
@Stateless
public class UserCrud {
	
	@Inject 
	private Service service;
	
	public UserCrud() {}
	
//	@Path("/getAllPlayListTracks/")
////	@GET
//	@POST
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public List<Object[]> getAll(String[] data) {
//		String username = data[0].replace("\"", "");
//		return service.getAllPlaylistTracks(username);
//	}
	
	@Path("/login/{username}/{password}")
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public boolean login(@PathParam("username") String username, @PathParam("password") String password) {
		return service.login(username, password);
	}
	
	@Path("/checkUserExistence/{username}")
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public boolean checkUserExistence(@PathParam("username") String username){
		return service.checkUserExistence(username);
	}
	
	@Path("/register/{username}/{password}")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void register(@PathParam("username") String username, @PathParam("password") String password) {
		service.addUser(new User1(username, password));
	}
	
	@Path("/getUserLibraries/{username}")
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public Collection<UserLibrary> getUserLibraries(@PathParam("username") String username){
		return service.getUserLibraries(username);
	}
	
	@Path("/getDevicePlaylist/{deviceId}")
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public Collection<PlayList> getDevicePlaylist(@PathParam("deviceId") String deviceId){
		return service.getDevicePlaylist(deviceId);
	}
	
	@Path("/getPlaylistTracks/{deviceId}")
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public List<Object[]> getPlayListTracks(@PathParam("deviceId") String deviceId1){
		return service.getPlayListTracks(Integer.parseInt(deviceId1));
	}
	
	@Path("/updatePlayList/")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Integer getAll(String[] data) {
		String PlaylistId = data[0].replace("\"", "");
		String PlayListName = data[1].replace("\"", "");
		return service.updatePlayList(Integer.parseInt(PlaylistId), PlayListName);
	}
	
}
