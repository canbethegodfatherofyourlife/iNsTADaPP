const { expect } = require("chai");
const { waffle} = require("hardhat");

describe("InstaDapp contract", function () {
  let InstaDapp, instaDapp, owner,author1;

  beforeEach(async function () {
    InstaDapp = await ethers.getContractFactory("InstaDapp");
    instaDapp = await InstaDapp.deploy();
    const signers = await ethers.getSigners();
    owner = signers[0];
    author1 = signers[1];
    // console.log(owner.address,author1.address,tipper.address)
  });

  describe("Add images", function () {

    it( "Now checking for valid hash", async function () {
      expect( instaDapp.addImages( "0", "For checking with 0 hash") ).to.be.revertedWith( "Not valid hash" );
    } )

    it( "Now checking for empty description", async function () {
      expect( instaDapp.addImages( "QmYbSDLefUBSHhcGJqiqx2w1J1AoqRmHW1QpCz6S9A7ehE", "" ) ).to.be.revertedWith( "Not valid description" );
    } )

    it( "Checking author...", async function () {
      await instaDapp.addImages( "QmYbSDLefUBSHhcGJqiqx2w1J1AoqRmHW1QpCz6S9A7ehE", "Welcome to InstaDapp" )
      const counter = instaDapp.count()
      const obj = await instaDapp.images(counter)
      expect(owner.address).to.equal(obj.author)
    })

    it( "Checking cid...", async function () {
      await instaDapp.addImages( "QmYbSDLefUBSHhcGJqiqx2w1J1AoqRmHW1QpCz6S9A7ehE", "Welcome to InstaDapp" )
      const counter = instaDapp.count()
      const obj = await instaDapp.images(counter)
      expect("QmYbSDLefUBSHhcGJqiqx2w1J1AoqRmHW1QpCz6S9A7ehE").to.equal(obj.cid)
    } )

  });


  describe("Giving Tips", function () {

    it( "Now checking if id is greater than zero", async function () {
      expect( instaDapp.giveTip( 0 ) ).to.be.revertedWith( "Not valid id" );
    } )

    it( "Now checking for empty description", async function () {
      expect( instaDapp.giveTip( instaDapp.count()-1 ) ).to.be.revertedWith( "Not valid id" );
    } )

    it( "Checking author's balance should increase, and author's tip amount should increase", async function () {
      await instaDapp.addImages( "QmYbSDLefUBSHhcGJqiqx2w1J1AoqRmHW1QpCz6S9A7ehE", "Welcome to InstaDapp" )
      await instaDapp.addImages( "QmYbSDLefUBSHhcGJqiqx2w1J1AoqRmHW1QpCz6S9A7ehE", "Welcome to InstaDapp")
      // console.log(await instaDapp.count())
      const obj = await instaDapp.images(2)
      const _author = obj.author
      const _tip = obj.tip;
      const provider = waffle.provider;
      const balanceOfauthor = await provider.getBalance(_author);
      await instaDapp.connect(author1).giveTip(2,{ value: ethers.utils.parseEther("1") })
      const balanceOfauthor1 = await provider.getBalance(_author);
      const obj1 = await instaDapp.images(2)
      const balanceOfAuthor1 = balanceOfauthor.add(ethers.utils.parseEther("1"))
      expect(_tip.add(ethers.utils.parseEther("1"))).to.equal(obj1.tip);
      expect(balanceOfAuthor1.toString()).to.equal(balanceOfauthor1.toString())
    } )
  });


});