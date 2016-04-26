package com.parser;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/file")
public class UploadFileService {
	public UploadFileService(){}
	
	private final String UPLOADED_FILE_PATH = "/usr/local/share/jboss/bin/Project_Upload/";
	
	@POST
	@Path("/upload")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces("text/plain")
	public Response uploadFile(String[] datas) throws IOException{
		String data = datas[0];
		String fileName = datas[1];
		String newPath = UPLOADED_FILE_PATH+fileName;
		File file = new File(newPath);

		if (!file.exists()) {
			file.createNewFile();
		}

		FileOutputStream fop = new FileOutputStream(file);
		// get the content in bytes
		byte[] contentInBytes = data.getBytes();

		fop.write(contentInBytes);
		fop.flush();
		fop.close();

		return Response.status(200) .entity("uploadFile is called, Uploaded file name : " + newPath).build();
	}
	
	@POST
	@Path("/delete")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces("text/plain")
	public Response deleteFile(String path) throws IOException{
		System.out.println(path);
		try{
	    		File file = new File(path);
	    		if(file.delete()){
	    			System.out.println(file.getName() + " is deleted!");
				return Response.status(200).entity(file.getName() + " is deleted!").build();
	    		}else{
	    			System.out.println("Delete operation is failed.");
				return Response.status(500).entity("Delete operation is failed.").build();
	    		}
	    	}catch(Exception e){
	    		e.printStackTrace();
	    	}
		return null;
	}
}
