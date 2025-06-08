import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LikesModule } from './likes/likes.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { PlaylistSongsModule } from './playlist-songs/playlist-songs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/melodifyDB'),
    ServeStaticModule.forRoot({
      rootPath: 'public/uploads/images',
      serveRoot: '/images',
    }),
    SongsModule,
    LikesModule,
    PlaylistsModule,
    PlaylistSongsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
