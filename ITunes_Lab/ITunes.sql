drop database if exists ITunes;
create database if not exists ITunes;
use ITunes;

drop table if exists `User1`;
drop table if exists `UserLibrary`;
drop table if exists `Track`;
drop table if exists `Playlist`;
drop table if exists `PlaylistTrack`;

create table `User1` (
	`username` varchar(100) not null, 
	`password` varchar(20) not null,
	primary key (`username`)
)ENGINE=MyISAM ;

create table if not exists `UserLibrary` (
	`libraryId` 	varchar(100) not null,
    `username`		varchar(100) not null,
    Primary Key (`libraryId`),
  FOREIGN KEY (`username`) 		REFERENCES `User1`(`username`)
)ENGINE=MyISAM  ;

create table if not exists `Track` (
	`trackPK`		varchar(100) not null,
	`trackId` 		int unsigned not null,
    `trackAlbum` 	varchar(128),
    `trackArtist`	varchar(128),
	`trackComposer`	varchar(300),
    `trackGenre`	varchar(128) default "",
	`trackName`		varchar(300) default "",
    Primary Key (`trackPK`)
)ENGINE=MyISAM ;

create table if not exists `Playlist` (
	`playlistId` 		int unsigned not null,
    `libraryId` 		varchar(100) not null,
    `playlistName`		varchar(100),
    Primary Key (`playlistId`),
  FOREIGN KEY (`libraryId`) 		REFERENCES `UserLibrary`(`libraryId`)
)ENGINE=MyISAM ;

create table if not exists `PlaylistTrack` (
	`PlaylistTrackId` 	varchar(100) not null,
    `playlistId` 		int unsigned not null,
    `trackPK`			varchar(100) not null,
    Primary Key (`PlaylistTrackId`),
  FOREIGN KEY (`playlistId`) 		REFERENCES `Playlist`(`playlistId`),
  FOREIGN KEY (`trackPK`) 			REFERENCES `Track`(`trackPK`)
)ENGINE=MyISAM ;


insert into `User1` values('Emer','1234');
insert into `User1` values('Yang','1234');
insert into `User1` values('Daniel','1234');
insert into `User1` values('Shanu','1234');
insert into `User1` values('Colm','1234');