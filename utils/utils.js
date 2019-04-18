const createRef = (people, option1 = "name", option2 = "phoneNumber") => {
  return people.reduce((acc, person) => {
    acc[person[option1]] = person[option2];
    return acc;
  }, {});
};
const renameKeys = (input, keyToChange, newKey) => {
  return input.map(book => {
    book[newKey] = book[keyToChange];
    delete book[keyToChange];
    return book;
  });
};

const formatAlbums = (albums, artistLookUp) => {
  const refVal = Object.values(artistLookUp);
  const refKey = Object.keys(artistLookUp);

  return albums.map(obj => {
    origKey = Object.keys(obj);
    origVal = Object.values(obj);

    obj.artistId = refVal[refKey.indexOf(origVal[origKey.indexOf("artist")])];
    delete obj.artist;
    return obj;
  });
};

module.exports = { createRef, renameKeys, formatAlbums };
