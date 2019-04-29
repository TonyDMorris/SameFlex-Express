const { expect } = require("chai");
const {
  createRef,
  renameKeys,
  formatAlbums,
  formatDate
} = require("../utils/utils");
const passHash = require("../utils/bcrypt");
const bcrypt = require("bcrypt");

describe("createRef", () => {
  it("returns an empty object, when passed an empty array", () => {
    const input = [];
    const actual = createRef(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it("returns an object contianing one persons name and number in a key value pair", () => {
    const input = [{ name: "Vel", phoneNumber: 01134445566 }];
    const actual = createRef(input);
    const expected = { Vel: 01134445566 };
    expect(actual).to.eql(expected);
  });
  it("returns an object contianing multiple persons name and number in  key value pairs", () => {
    const input = [
      { name: "vel", phoneNumber: 01134445566, address: "Northcoders, Leeds" },
      {
        name: "ant",
        phoneNumber: 01612223344,
        address: "Northcoders, Manchester"
      },
      { name: "mitch", phoneNumber: 07777777777, address: null }
    ];
    const actual = createRef(input);

    const expected = { vel: 01134445566, ant: 01612223344, mitch: 07777777777 };

    expect(actual).to.eql(expected);
  });
  it("accepts additional args to custamise keys", () => {
    const input = [
      { name: "vel", phoneNumber: 01134445566, address: "Northcoders, Leeds" },
      {
        name: "ant",
        phoneNumber: 01612223344,
        address: "Northcoders, Manchester"
      },
      { name: "mitch", phoneNumber: 07777777777, address: null }
    ];
    const actual = createRef(input, "name", "address");

    const expected = {
      vel: "Northcoders, Leeds",
      ant: "Northcoders, Manchester",
      mitch: null
    };

    expect(actual).to.eql(expected);
  });
  it("accepts additional args to custamise keys", () => {
    const input = [
      {
        track: "11:11",
        artist: "Dinosaur Pile-Up",
        releaseYear: 2015,
        album: "Eleven Eleven"
      },
      {
        track: "Powder Blue",
        artist: "Elbow",
        releaseYear: 2001,
        album: "Asleep In The Back"
      }
    ];
    const actual = createRef(input, "track", "artist");

    const expected = { "11:11": "Dinosaur Pile-Up", "Powder Blue": "Elbow" };

    expect(actual).to.eql(expected);
  });
});

describe("renameKeys", () => {
  it("returns a new empty array, when passed an empty array", () => {
    const albums = [];
    const keyToChange = "";
    const newKey = "";
    const actual = renameKeys(albums, keyToChange, newKey);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(albums);
  });
  it("returns a new array of length one when passed one object to modify the keys on", () => {
    const albums = [
      { title: "Slaughterhouse-Five", writtenBy: "Kurt Vonnegut" }
    ];

    const keyToChange = "writtenBy";
    const newKey = "author";
    const actual = renameKeys(albums, keyToChange, newKey);
    const expected = [
      { title: "Slaughterhouse-Five", author: "Kurt Vonnegut" }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(albums);
  });
  it("will return a new array containing multiple objects with updated keys", () => {
    const albums = [
      { title: "Slaughterhouse-Five", writtenBy: "Kurt Vonnegut" },
      {
        title: "Blood Meridian",
        genre: "anti-western",
        writtenBy: "change my key"
      }
    ];
    const keyToChange = "writtenBy";
    const newKey = "author";
    const actual = renameKeys(albums, keyToChange, newKey);
    const expected = [
      { title: "Slaughterhouse-Five", author: "Kurt Vonnegut" },
      {
        title: "Blood Meridian",
        genre: "anti-western",
        author: "change my key"
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(albums);
  });
  it("can be used with an optional reference object to modify keys", () => {
    const albums = [
      { title: "Slaughterhouse-Five", writtenBy: "Kurt Vonnegut" },
      {
        title: "Blood Meridian",
        genre: "anti-western",
        writtenBy: "Cormac McCarthy"
      }
    ];
    const titleIdArray = [
      { title: "Blood Meridian", id: 1 },
      { title: "Slaughterhouse-Five", id: 2 }
    ];
    const ref = createRef(titleIdArray, "title", "id");
    const keyToChange = "title";
    const newKey = "titleId";
    const actual = renameKeys(albums, keyToChange, newKey, ref);
    const expected = [
      { titleId: 2, writtenBy: "Kurt Vonnegut" },
      {
        titleId: 1,
        genre: "anti-western",
        writtenBy: "Cormac McCarthy"
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(albums);
  });
});

describe("formatAlbums", () => {
  it("returns a new empty array, when passed an empty array", () => {
    const albums = [];
    const artistLookup = {};
    const actual = formatAlbums(albums, artistLookup);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(albums);
  });
  it("returns a new empty array containing modified objects in reference to the artist lookup", () => {
    const albums = [
      { name: "Grammatics", artist: "Grammatics", releaseYear: 2009 },
      { name: "Kingdom of Rust", artist: "Doves", releaseYear: 2009 }
    ];
    const artistLookup = { Grammatics: 9923, Doves: 324 };
    const actual = formatAlbums(albums, artistLookup);
    const expected = [
      { name: "Grammatics", artistId: 9923, releaseYear: 2009 },
      { name: "Kingdom of Rust", artistId: 324, releaseYear: 2009 }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(albums);
  });
});
describe("formatDate()", () => {
  it("should format the date from a timestamp to a DateTime", () => {
    const objArray = [{ created_at: 1471522072389 }];
    const formattedArray = formatDate(objArray);
    expect(formattedArray[0].created_at).to.eql(new Date(1471522072389));
  });
  it("should not mutate the original ", () => {
    const objArray = [{ created_at: 1471522072389 }];
    const formattedArray = formatDate(objArray);
    expect(formattedArray[0]).to.not.equal(objArray[0]);
  });
  it("should give a created_at key to objects that dont have it  ", () => {
    const objArray = [{}];
    const formattedArray = formatDate(objArray);
    expect(formattedArray[0]).to.have.key("created_at");
  });
  describe.only("passHash", () => {
    it("should hash a password", () => {
      return passHash("password").then(hash => {
        expect(bcrypt.compareSync("password", hash)).to.be.true;
      });
    });
  });
});
