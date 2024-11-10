actor hesap_makinesi {

  var hucre : Int = 0;

  // Toplama.
  public func ekle(s : Int) : async Int {
    hucre += s;
    hucre;
  };

  // Çıkarma.
  public func cikar(s : Int) : async Int {
    hucre -= s;
    hucre;
  };

  // Çarpma.
  public func carp(s : Int) : async Int {
    hucre *= s;
    hucre;
  };

  // Bölme.
  public func bol(s : Int) : async ?Int {
    if (s == 0) {
      null;
    } else {
      hucre /= s;
      ?hucre;
    };
  };

  public func temizle() : async () {
    hucre := 0;
  };
};
