const ALBUM_DB_META = {
  tableName: album,

}


class Album{

  static async getAlbumList() {
    const sql = `DELETE FROM ${ALBUM_DB_META.tableName} WHERE id = :albumId`;
    return await global.db.q(sql);
  }

  static async deleteAlbum(albumId) {
    const sql = `DELETE FROM ${ALBUM_DB_META.tableName} WHERE id = :albumId`;
    await global.db.query(sql, { albumId });
  }

  //   {
  //     id: newAlbumInfo.id,
  //     title: newAlbumInfo.title,
  //     discription: newAlbumInfo.discription,
  //     ispublic: newAlbumInfo.ispublic,
  //     visitcount: newAlbumInfo.visitcount,
  //     createtime: newAlbumInfo.createtime
  //  }
  static async updateAlbum(newAlbumInfo) {
    await global.db.query(
     `UPDATE ${ALBUM_DB_META.tableName} 
      SET title=:title, discription=:discription, visit=:visit, ispublic=:ispublic,
      visitcount=:visitcount, createtime=:createtime, cover_url=:cover_url
      WHERE id=:id
      `,
      newAlbumInfo);
  }

  static async createAlbum(newAlbumInfo) {
    await global.db.query(
      `INSERT INTO ${ALBUM_DB_META.tableName} (
        createtime, visitcount, ispublic, discription, title
        ) VALUES (
        :createtime, visitcount, ispublic, discription, title
        )`,
        newAlbumInfo);
  }
  
}

module.exports = Album;