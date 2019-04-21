const createRef = (people, option1 = "name", option2 = "phoneNumber") => {
  return people.reduce((acc, person) => {
    acc[person[option1]] = person[option2];
    return acc;
  }, {});
};
const renameKeys = (
  data,
  keyToChange,
  newKey,
  refObj = createRef(data, keyToChange, keyToChange)
) => {
  return data.map(obj => {
    newObj = { ...obj };
    newObj[newKey] = refObj[newObj[keyToChange]];
    delete newObj[keyToChange];
    return newObj;
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

const formatDate = array => {
  return array.map(article => {
    const dateNow = new Date();
    const date = new Date(article.created_at ? article.created_at : dateNow);
    const { created_at, ...rest } = article;

    return { ["created_at"]: date, ...rest };
  });
};

module.exports = { createRef, renameKeys, formatAlbums, formatDate };
