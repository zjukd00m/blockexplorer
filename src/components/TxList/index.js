import { useEffect, useState } from "react"
import { AlchemySubscription } from "alchemy-sdk";
import { DocumentTextIcon, CubeIcon } from "@heroicons/react/24/solid";
import alchemy from "../../utils/alchemyClient";

const Tx = [
{
    "hash": "0x0070db9be6a3bbd17e564d7a3fe7eb392baae13f4ce8aceea6e9949fe34964f2",
    "parentHash": "0x612d90ea190471a2ff522ee6e096d5b2d304f803e58fe1e0472b618aa095e10c",
    "number": 16779096,
    "timestamp": 1678224551,
    "nonce": "0x0000000000000000",
    "difficulty": 0,
    "gasLimit": {
        "type": "BigNumber",
        "hex": "0x01c9c380"
    },
    "gasUsed": {
        "type": "BigNumber",
        "hex": "0x010d95d7"
    },
    "miner": "0x690B9A9E9aa1C9dB991C7721a92d351Db4FaC990",
    "extraData": "0x6275696c64657230783639",
    "transactions": [
        "0xb750ca5212047cdaa3c4af497c7f25b63cef01df47a7626a480bdc478b7568c9",
        "0xf8e695dd1bab38e9ead95f342f848180a519173a23b1125dee1ed71219381208",
        "0xe85a0f02729d98f146503bc3159678d4ec7282095f9982a5f035828bdf97d022",
        "0xea1ee739de9d817cf14b3263c1e3b4e1ed458b2f2ea3c0f3a5847010ba1d1a82",
        "0x9c4578cdec3cef2d615c2b5da55af17772e040e8cdf89fa783fd92e5bcd91a48",
        "0x76c9dd8b67ea752ad9e45c5634f5dd496e9c94f50b1c13e0b61cc295c3879264",
        "0xb6bdb1def2a94c790f8af7339a179f5b6fbf92bf921a33a7a217b4fa524a6fe4",
        "0xb66b13ff71fc6b16a045adf80ab0ba40e65dd8505ef1014a5340c854fab8af16",
        "0x84b46fde6ee1b5bc8041eb30727acb34b27cc65965ad2bd83925a3ef099c87eb",
        "0xfbbb649fbbe543aa4a3a4d2ce083672a3721d90293dd2ff11fa16940d260e18f",
        "0x92ba97e3a6a56df181bdeac9b0c6f0f172238e60ef5af67e9cfa3b4494a5ce7b",
        "0xd0fb4880362f7ec255430ad5edcb1ee2dde250e4b66e72e96d98d3720428c4b4",
        "0x141b4a24e44ddd0176fac589b976ee3afa1bb7166fb60247849968f1b338662a",
        "0x29103412e10d687e15db5a4f8f60ef3993fb4ccc7d34d8ebe20e5d035cdaf1a9",
        "0xaf486916eabbb95ae655bf97399373e683f0a8129a31a609dac0075afa9a5e18",
        "0x903d4affae39f58fe81a2c5f0f40e0a8bcb4f4ee09f07d92ca6fa427b723157c",
        "0x4408537eb742e2b2689c7d0d292e0f46c374da24367f64fc4c8a50f8db8382e8",
        "0xf02da59d0af84f02a02ce2509e5aef26b9668fd8a3d6d5f0ba5d0a270db17e4e",
        "0x973f623dad41dcc027ca7d595727630846b12851f0795cf6905b87eff75bbb8a",
        "0xf7c9f6958bb6428f159708e3aca8a459e088e732538a652ea48232540b21d94a",
        "0xbbf3d3c6daf29bad3a170ae79b4f88acf7fbb481997b631dc7bc4498727568e2",
        "0xbbe779ae6392907dc2755304c8f7b6d22b5cc2a1c998a2cb55e035b0263779ad",
        "0x562b5b5f39960b860a89d0c2a8d627de4fda1b30a1c96f91047af338a76cf288",
        "0x1878b49915dcc03f98c0d5854bdba89e6cee64d834da52f81d804245379035be",
        "0x39bae5030ffd3635b9f94a65632011add50e7eb5ebb5d6afe1e8e56d6174f34a",
        "0xaffd7cf64b47d626d37c7dfbdd8c9426dc4032be65a0fa1371254929e902602f",
        "0x32259ff66b22e84e536c23aee245c98692d9d42b2f85c43e411eeec758ad6d89",
        "0x6d0979a09992a25c1682ccd7922862bc0cc0c98adb31a5692a4bc837d5e668c4",
        "0xffc2d6cc005881faa0af699b05fa5d9a579af97793d7d7c672b8482c6cba549d",
        "0xaedb3706654a6dfc2e210298ffcc693468bda419d7170bfc78384b38a61ff9ad",
        "0x5cd3f7d8437128a9ba24f22ca3cc7e5c4872f930853ae367e52c8bf5a4ab349b",
        "0x494ca123a33eed97d3918ef1855e58cdee93ab2ead442a4711230402d8174e2b",
        "0xca4cd46dc10ad2dddc52ad7b18db568caa4547b9b43b5aa84ca82e44b48da752",
        "0xe8498c7273f71385566710b5adb0ec033fcf16c84d75f3ad8ef05acf0c20f50b",
        "0xc721c8ff509b24799f15c6d4e529bc58dbfff2e7f69cb4876bcc8ef440493ede",
        "0x29b95b9e38e76cb45e4cbe01efc714c12c1d9d505296eb805105355a6d54ae68",
        "0x3b30532e4456310c6b1f6912f969f6a5362f999ea1b54233c4d08806ba2dedd1",
        "0x6cb2550204c763b5e777219cf18b2bef11f9f0a50a64e22569793ce87eafb034",
        "0x5fb11f75c575441c9624414e280ce5444b3c9cf7259df0107c43f88833505fd7",
        "0xe8e996fe35570f33d74ec117837759a6b068ccb76978b25588ee51192cdb4ceb",
        "0xaa907f111831f6a3da9e5f80ea587a2e34ed6f4a4c792d046be1f4e209c63da7",
        "0xf392bf2b8f214ff2272352ac0c9aed39e891b5a0f90a90ec526f8a727aeb8166",
        "0x9ad4f14fd28b2cb117f61ec020140a2b7e48224384ad0db393e0949829dc0741",
        "0xb2db0a4ef8f00905169b2d3c9132fc065e293a2a7c99dfeae373ade718fd0661",
        "0x8da10a1bd99749077b9d0b4922e47f2f551c712c769e3a5cf5814433d9637d05",
        "0x7a83e4f66b557ea54dfd191e24d7e9f41d375e6188389f12c47c16bfb6b1902c",
        "0xcce85b511387b42383af9836f1aadc8dbc5ffbb479841a9cdedc1d2ae9a15578",
        "0xbbef85b4a415801eecdcbf86bed0c478c99187d5c2da057ef1d095b3f664bcd9",
        "0xb888f0453954046148659791089aee0317cfe52ab9984de072d7dc28bcc5306a",
        "0x880f0ffc5a329abb0368649a4e0ab0fbb5182080bb22c5fb1a13eebdb22a1e8f",
        "0xe6776700c79d0c2ab890dd1d11db2e24aa6834fa642178c4e93e596054c80282",
        "0xeb71a4e3c6c61f887e2b382110b5152a107024ea29719bc8490abce8fdea6c3d",
        "0x257cbb142d8a980ff8be0b668970d4c4df91fcd7a059e99241e6736d4f586c53",
        "0xf42babb46663b08ae069f26c7c7a09f4a7d3690edeb909b047d0cff155936549",
        "0x8a1588b4f59a297715004313b11b7c7f9daaee0bb34da4eb2eba3659f6f15438",
        "0x1e4305ee62f939007f18c6c361938982a3173f0ca4f04cd832e16596686f5539",
        "0x20b1c569dd8864ee7e2f40c0b7bc9ea37f755b3851494a8c61a17d982f0d0994",
        "0x56467475f073ee53f5552e8c8970e14498369a1b2d0a743fa51b2ab0850488b1",
        "0xe644d01f09c7b23ed244d5bd5b62bda84ed8e795de95cae25cf4a973d0972f07",
        "0x00187ca9920c89eb4cbc271c117f50cbd2f7aadc2fd7d28dae5b3adb72d3f396",
        "0x74e45850085ff748b13342747395fdbff459f591a59f1978ddf10bc219fb5e17",
        "0x6f263559d5af7e9e24c3d011328d1cfad46e4bc6697f2b7df2ad513af31b0565",
        "0xb6b7a2513120a19ac502671916b0349e6df099d5b293f8c2b5f847b0ccc2aea1",
        "0xa92c4e7d44ea3984c7b9c774c68f47e39eacfcbfbce86bcf7998f6634497189f",
        "0xcef4d8a0baa0a4d99952af342612ce9fa366117c004fb3bd55dae6378dffe96e",
        "0x5acc4190b7e8a41b9f7ab2f7ed7c12061208e488a530ada0490d6afd52acddf3",
        "0x023c458a034b1ea163a1a8bd82466b5d4a9fe26ccb702dc10ef1410b5017153c",
        "0x8dac81011509516f6a2ee7fbb00125974b281569e3d4023f0afca84269e7584d",
        "0x2af698aa455cf327ef6a478a217a3a09a3ea75762b01af7edfa16f5897482c32",
        "0xce6e4c2a5e224ffce2488dbca64eae20e6644006e55be9763de4b5382420c158",
        "0xce24bcc330c21216c7498ba4ca0f1e42b052cd1973ae69d9fb61bd781f93d628",
        "0xe7aa8e6b1799ed77965634d4e3acd6e5ddafb3f1e9ee1117404a2faf9f27cb56",
        "0xcb2fe28c3c8939f400aa1e2f373556903a641e7f9ad380df1cb296a4e0ba79e6",
        "0x4e7f40938f9338b09fa56d90bfffd3aa6ce644b81b1bec100bd00e05b780c3ae",
        "0x8f590cd8d4f99a0a480bd5d9049e87deeccb0c4d1978ce52d0795b0e11a1b39e",
        "0xd6007975020d5962fcc57ecf573b834a1196ea55081bb567b119419ec3bd72df",
        "0xeaddf43f583a38eafdaf8da531925edd0de114c4443f7d9b765f2af3bb4f21d2",
        "0xa8cb3f9a49f5b475ccbbdd3361bcc5045c9cd071f76cd445a779e21eab94d1c3",
        "0xa99463b9e28b14ce156664c715d01e8f27190d21ca1ff88f76a7f6fefb90e842",
        "0xe6f25fd44aca9ec8fdcf3fdb3a8363a1a28fb72bce05d1f8d3740a2727878e45",
        "0x965139692c725b0349ce9f4653dbfb58cd153845d6b0ac171986e4d77a2929c2",
        "0xf5db4c4bd23dee34cf34b47db414b4888a9b85ce49500f1004a146ecfe0f3dcd",
        "0x853074e200715292dc03d38c9302fc235d8fa1d881386212d28036c0812a79ba",
        "0x54fcc7117810e6ea35ea3e95c59aa0fe8bc9290808737500e45a028d0a8e456a",
        "0x1bcd621a8b620b97d84d27021eda4681fcfa766c00bb928b9f6a5e7f47cd3a74",
        "0x2738ff9ebba04eced48891d9441b2f019d9f6abe126d86ad90ef684f7e8efe0e",
        "0x442b44c4843bf544f5d70e6514fa0b50b7f1fabcdfc4cf0bf9ad422a70bcb86f",
        "0x7ca231c0c96f7815fff59ab3ede606d68ac17fc601f0ad8b86698dc682fc716e",
        "0x5491a91b3f2485a738773b9487a6822fec873d2c3ed892a6add980a861b1acd0",
        "0x630f3483fca258afdd561fba54bdd57488747a6cc98b68fe0754942dcc94b39c",
        "0xb42e872633356c9cdd73b8a2a733515a0558ec23bdbfe4fbc2adfe0def75370e",
        "0xa8971e947e21e6806b009299ddc9d6c7b62e6827d86667b3af30aae3069711d6",
        "0x5fb0b23b57a6466b76e4ee920dc2b1693fb92eb0128be84a2f5deaec0d190bc7",
        "0x27f0afbb71fcdb83b90acb6477f8e0803a90d26becce3ec9101a4b65d2210956",
        "0x0f6cf7812c6e4a8c3b00d732b50e9928c43d59a2e515831d481cfcb80696a8f1",
        "0x93626be54de381723469b836ecb2cd8bcc53f0d50c77a5554ec8d98a0aaf4d7d",
        "0x0b5a7d539439a1aa120f7d884186014e111dadc3ac017e4a56eceec29e24eb2e",
        "0xcfb9a7e723cf72f699fa1232c9478c3dbf1b7fcdb944ed7ec28c6fa9ae47a935",
        "0xdeb6af330a0b4ca247e5046c02c9bfc8b602514aeef6851efc69330b62513d86",
        "0x32b0715a919d8e520f9f878fd06f12fce82a440a6e67efd6417bcdf4c14a4d37",
        "0x451771b7a1987f143bbd4e7ece7284ebb0dbc301a457937f8716a1e653ff4d0d",
        "0x6887ebd88efa3d7fdfd91a755b692ca284951db18d0c66c2c5ef0e82058fe7e3",
        "0xd7c649a105affe51a8ae585e265f9f1dbc2a046726c62b49098e97b74f42a9cb",
        "0xd352f42d36fa65e3fcf5ddafb60bfe24cd3c0a9bbecfacc5e1e76e9646d78632",
        "0x1482b7d53a9f1b6564f649f298bbf98f5409bf346f25d85114e70a5dc6d4c65d",
        "0x4bda44f58d57f2700daed125783dbba353a0ba8526b059cb4c5659863c90acbb",
        "0x5e2bda270c9a827cc94f92350a4d42f8832f0004f3b0d545d2bd4f16707d238c",
        "0x10f55da8a7c5d2c5ed87cdcd70221e39b5d67f53e20f49531814eb54eba49212",
        "0x2d8637381ada516bbb0221a7bfd7d0d3f092fef5462900abe729ee9a7d6de765",
        "0x38675e0e8d9a0ef6ffeb1cc884330d2d23db7da2974d4f51d948bd21be9a2b79",
        "0x1f0ac193be05346f5b291372ccd25be2b6d7a8022dc857fa2fb02982f1edda60",
        "0xc47bc468da682bc4dcbad6dc471d0d25c4402d43ee013199a63aace122c6c4ed",
        "0xa79c38ad68398c2ec84465e7482c6831d2bf523f2c4a54926b38e3b3f3456101",
        "0xe1237e324bf2f8703030ec0d8520cfe2bc1683ae3f5ef7afff1a3ebb0bcf8c17",
        "0x9809a3e32de0ec47958c82004bcfb4452ecaea0e420d685622cb3c2a852fbeff",
        "0x75d22097b53b74be6bd81b17346645adfa3c108d4da0563df7af209acd2c7ed4",
        "0x184036691bc6e7c6379bf2f8f4f5086d224db324d207a6169c6a9f13ccaae121",
        "0xf6a3e603970633450047c715e145f3c1e78a1e764811bf7fc2bd5e9139facfb7",
        "0x59098be14fdbf481e4a34efb0ed0f30778b2ab802070fa92f8cffa131f1e45bc",
        "0x0e1982531c527ff2b886e429c6aa0c74cc2226ab0d30ba25c1edb06f65e5c201",
        "0xdea2ee56e8818a5336ee26630b8b4978050b17c9474dc0cd2543f093850bf3a4",
        "0x1576b73a49deb0208a8fcd48de8ad855a3a9012c7c9c3432b3b985f953d1e292",
        "0xf74382f71a4ede6766f1dead34a073e533e78abdcdbcff7d6d5675409d0a69b5",
        "0x698085fb501a594a7d6018d117c8194af68f121fac894574715feddf5628b3a6",
        "0xbc150247ebcfa0b30aeb75050db6320c5780ef6a6339af65ccc928a74c5baa5e",
        "0x683e0e12b6bec95a58a993996ccd31ec06471c0c3b755a7b3e288ba4e4f8faa3",
        "0x258c1c5552397fc33878379b08b4b50fcf79f299771f6502480782e8485cb98f",
        "0x92b80a15307480bba4fc9f16b2e36dd87a45547a73dcf3996614a2013722a1c4",
        "0x024c8ea6f3e4ca2a6167099c19b2970e42ca3c2ccaf970d7213fea28968627b4",
        "0x88232c08c64ab9653b2845149479ebb9788f8f16f1f11e916921184e6865f6d7",
        "0x834f92475425ba4f7ba4da6d82edd8709f7026caee04de370c670567cdfe29c2",
        "0x18fa2036e07ee449c989c20a8c83d2fe5024e183d1f4927d8e7fffb246608295",
        "0x7b36e8e5409c26fefa737e3305e219a1b89d8e0eece784e049af11a8ca654e4b",
        "0xaa97921a711be12023147a0e97fb281243ca94b4c8a5fad27991f14ea1c3b9be",
        "0x282d48e50a55ea2d0b43e60f3fbe578990227175e2cd4e0bd9b262b3dce77b4a",
        "0x4063339f750e2bd524d0f66e536eb70a647514caccf144d8304eabf62ddfc40c",
        "0xe3d7e60843164050415905c3857d414b079146d465c88ba294633074b0deb2d1",
        "0xe916cfb44587c66f3cdcc0ccc6782e22418c5e35907349016d79ee5543e378e1",
        "0x22b8b3248718e1dd863627e883d014549deeb318e31327901ed13cd621e4eabc",
        "0x37a7c591b4a60c7af688e31c202e77e2d2ae08995f272cef72abc7bcd8d8fa40",
        "0xcae333dfebc3102eeaff8d26acbcd5896581833f8bb28fb89083e8b46790c325",
        "0xbd33501cd27801a7f06c8e3fd3e3c1c1d776f04cf63383a4cf4cd7f9935f7eff",
        "0x83b65ce507f9f2123662dbc135b5e9e973bb8567db7e57a728855d918fcc45a0",
        "0xa68024ecc4be42624eef45efbc1e6971a2e6f1ea4450ef4531c9e1da34123fdb",
        "0x9c15f01b82da5509cea4e006bf1217e550999b74290aa8ec4f1175d31eade8bb",
        "0xfbbe74913f115056a252a1ce2ac329842c56a85e3563ecb156d8df863a2c0738",
        "0xac91f57f7bcf7af592e8cf33f6cf475e36aca1564b3ef8d1e1e2d8f06c27bd8d",
        "0xa1981dae54d6824ee734e8a4fd2f8dac0883bae549498f2831c7224be4338800",
        "0x6aaed6f474ba2d560b9a1692e2958ac054319c51f309d391d5282c39bfcaa04e",
        "0xb23b5e62126e4de002dd6997307c09d9a162820a4eb7f18e4009a20e00e3c74e",
        "0xa93184ac07e4631ce464fc35224e56c308dd43eeb2cb163ddf82bbc732ae8c9f",
        "0x73349aa1e2ddc8d1bff5dd6a83c5572ef0f5cd6f81f171433b1e8c9ae7c02bf6",
        "0x0d956cbc6de9c0062d29b266182c3db94fc5d59449d0f92081f5ffaa5c6fd2c8",
        "0x69596a143065a08f37e4325b7bcc4f7fc8a5f3df4d866ee6f6e9f4eeed08f4d8",
        "0x9891d5b466a45e76713d01c4f3f4b9a7f75fca171b717ce52ac0a4509576a06f",
        "0x9b96a86c833f67e5c90acaab1f32dc04d554e47eb13e370e85c06e145b60fdcc",
        "0x2ae1fe78ccc3c908da9e75c571746205627db0d1a7cfdff05f42b615c9a7de22",
        "0x6ff4e57c55a8a5daa18a588b385f76852c6297b7f94f3b339d27c6705ce361f0",
        "0x551366565ad6ebd32e41aa5616dd972e40858ba4c55243f60281bfa67743168c",
        "0xa8accf897d9c3e6590fa243dd3f209a9e762ede7c65eb1ba331950d55fa8e8b1",
        "0xd32dabdebd20768b8e9c1f29479040cb1c14cf7f5b812273a7142e071b3354c8",
        "0x362855e111df4421e69d847d911825c8a7b7ae621b16e7513250bd0e9a547c22",
        "0xfb22424fb832e10b3d37c733f4b64a960b04faa6f8553452359eec8529c214cc",
        "0x2d8a2908d4a848649aecf7c80a5966075153049622e80bcf3e2f6071cb8bdc07",
        "0x25f5661f515955277964616b6fc13f4cdd532cd076015f9700078396636dd816",
        "0xdcf9b7430fb68776a5c32673d50537e21e5380bd085e70db5d5ef210ef590601",
        "0x4c296d875af49214ff2418d86ebe580e91a8a374865db18c5aa23670c1204307",
        "0x85f8cc8140482e96259a10228bd3bf48dac758e32462113ee528a17e3515507d",
        "0x0db52d98b6183e6188166f71e01e7bc8b48a626f92d460157b9b1c4051b072f8"
    ],
    "baseFeePerGas": {
        "type": "BigNumber",
        "hex": "0x08ba05ad3a"
    },
    "_difficulty": {
        "type": "BigNumber",
        "hex": "0x00"
    }
},
{
    "hash": "0x0070db9be6a3bbd17e564d7a3fe7eb392baae13f4ce8aceea6e9949fe34964f2",
    "parentHash": "0x612d90ea190471a2ff522ee6e096d5b2d304f803e58fe1e0472b618aa095e10c",
    "number": 16779097,
    "timestamp": 1678224551,
    "nonce": "0x0000000000000000",
    "difficulty": 0,
    "gasLimit": {
        "type": "BigNumber",
        "hex": "0x01c9c380"
    },
    "gasUsed": {
        "type": "BigNumber",
        "hex": "0x010d95d7"
    },
    "miner": "0x690B9A9E9aa1C9dB991C7721a92d351Db4FaC990",
    "extraData": "0x6275696c64657230783639",
    "transactions": [
        "0xb750ca5212047cdaa3c4af497c7f25b63cef01df47a7626a480bdc478b7568c9",
        "0xf8e695dd1bab38e9ead95f342f848180a519173a23b1125dee1ed71219381208",
        "0xe85a0f02729d98f146503bc3159678d4ec7282095f9982a5f035828bdf97d022",
        "0xea1ee739de9d817cf14b3263c1e3b4e1ed458b2f2ea3c0f3a5847010ba1d1a82",
        "0x9c4578cdec3cef2d615c2b5da55af17772e040e8cdf89fa783fd92e5bcd91a48",
        "0x76c9dd8b67ea752ad9e45c5634f5dd496e9c94f50b1c13e0b61cc295c3879264",
        "0xb6bdb1def2a94c790f8af7339a179f5b6fbf92bf921a33a7a217b4fa524a6fe4",
        "0xb66b13ff71fc6b16a045adf80ab0ba40e65dd8505ef1014a5340c854fab8af16",
        "0x84b46fde6ee1b5bc8041eb30727acb34b27cc65965ad2bd83925a3ef099c87eb",
        "0xfbbb649fbbe543aa4a3a4d2ce083672a3721d90293dd2ff11fa16940d260e18f",
        "0x92ba97e3a6a56df181bdeac9b0c6f0f172238e60ef5af67e9cfa3b4494a5ce7b",
        "0xd0fb4880362f7ec255430ad5edcb1ee2dde250e4b66e72e96d98d3720428c4b4",
        "0x141b4a24e44ddd0176fac589b976ee3afa1bb7166fb60247849968f1b338662a",
        "0x29103412e10d687e15db5a4f8f60ef3993fb4ccc7d34d8ebe20e5d035cdaf1a9",
        "0xaf486916eabbb95ae655bf97399373e683f0a8129a31a609dac0075afa9a5e18",
        "0x903d4affae39f58fe81a2c5f0f40e0a8bcb4f4ee09f07d92ca6fa427b723157c",
        "0x4408537eb742e2b2689c7d0d292e0f46c374da24367f64fc4c8a50f8db8382e8",
        "0xf02da59d0af84f02a02ce2509e5aef26b9668fd8a3d6d5f0ba5d0a270db17e4e",
        "0x973f623dad41dcc027ca7d595727630846b12851f0795cf6905b87eff75bbb8a",
        "0xf7c9f6958bb6428f159708e3aca8a459e088e732538a652ea48232540b21d94a",
        "0xbbf3d3c6daf29bad3a170ae79b4f88acf7fbb481997b631dc7bc4498727568e2",
        "0xbbe779ae6392907dc2755304c8f7b6d22b5cc2a1c998a2cb55e035b0263779ad",
        "0x562b5b5f39960b860a89d0c2a8d627de4fda1b30a1c96f91047af338a76cf288",
        "0x1878b49915dcc03f98c0d5854bdba89e6cee64d834da52f81d804245379035be",
        "0x39bae5030ffd3635b9f94a65632011add50e7eb5ebb5d6afe1e8e56d6174f34a",
        "0xaffd7cf64b47d626d37c7dfbdd8c9426dc4032be65a0fa1371254929e902602f",
        "0x32259ff66b22e84e536c23aee245c98692d9d42b2f85c43e411eeec758ad6d89",
        "0x6d0979a09992a25c1682ccd7922862bc0cc0c98adb31a5692a4bc837d5e668c4",
        "0xffc2d6cc005881faa0af699b05fa5d9a579af97793d7d7c672b8482c6cba549d",
        "0xaedb3706654a6dfc2e210298ffcc693468bda419d7170bfc78384b38a61ff9ad",
        "0x5cd3f7d8437128a9ba24f22ca3cc7e5c4872f930853ae367e52c8bf5a4ab349b",
        "0x494ca123a33eed97d3918ef1855e58cdee93ab2ead442a4711230402d8174e2b",
        "0xca4cd46dc10ad2dddc52ad7b18db568caa4547b9b43b5aa84ca82e44b48da752",
        "0xe8498c7273f71385566710b5adb0ec033fcf16c84d75f3ad8ef05acf0c20f50b",
        "0xc721c8ff509b24799f15c6d4e529bc58dbfff2e7f69cb4876bcc8ef440493ede",
        "0x29b95b9e38e76cb45e4cbe01efc714c12c1d9d505296eb805105355a6d54ae68",
        "0x3b30532e4456310c6b1f6912f969f6a5362f999ea1b54233c4d08806ba2dedd1",
        "0x6cb2550204c763b5e777219cf18b2bef11f9f0a50a64e22569793ce87eafb034",
        "0x5fb11f75c575441c9624414e280ce5444b3c9cf7259df0107c43f88833505fd7",
        "0xe8e996fe35570f33d74ec117837759a6b068ccb76978b25588ee51192cdb4ceb",
        "0xaa907f111831f6a3da9e5f80ea587a2e34ed6f4a4c792d046be1f4e209c63da7",
        "0xf392bf2b8f214ff2272352ac0c9aed39e891b5a0f90a90ec526f8a727aeb8166",
        "0x9ad4f14fd28b2cb117f61ec020140a2b7e48224384ad0db393e0949829dc0741",
        "0xb2db0a4ef8f00905169b2d3c9132fc065e293a2a7c99dfeae373ade718fd0661",
        "0x8da10a1bd99749077b9d0b4922e47f2f551c712c769e3a5cf5814433d9637d05",
        "0x7a83e4f66b557ea54dfd191e24d7e9f41d375e6188389f12c47c16bfb6b1902c",
        "0xcce85b511387b42383af9836f1aadc8dbc5ffbb479841a9cdedc1d2ae9a15578",
        "0xbbef85b4a415801eecdcbf86bed0c478c99187d5c2da057ef1d095b3f664bcd9",
        "0xb888f0453954046148659791089aee0317cfe52ab9984de072d7dc28bcc5306a",
        "0x880f0ffc5a329abb0368649a4e0ab0fbb5182080bb22c5fb1a13eebdb22a1e8f",
        "0xe6776700c79d0c2ab890dd1d11db2e24aa6834fa642178c4e93e596054c80282",
        "0xeb71a4e3c6c61f887e2b382110b5152a107024ea29719bc8490abce8fdea6c3d",
        "0x257cbb142d8a980ff8be0b668970d4c4df91fcd7a059e99241e6736d4f586c53",
        "0xf42babb46663b08ae069f26c7c7a09f4a7d3690edeb909b047d0cff155936549",
        "0x8a1588b4f59a297715004313b11b7c7f9daaee0bb34da4eb2eba3659f6f15438",
        "0x1e4305ee62f939007f18c6c361938982a3173f0ca4f04cd832e16596686f5539",
        "0x20b1c569dd8864ee7e2f40c0b7bc9ea37f755b3851494a8c61a17d982f0d0994",
        "0x56467475f073ee53f5552e8c8970e14498369a1b2d0a743fa51b2ab0850488b1",
        "0xe644d01f09c7b23ed244d5bd5b62bda84ed8e795de95cae25cf4a973d0972f07",
        "0x00187ca9920c89eb4cbc271c117f50cbd2f7aadc2fd7d28dae5b3adb72d3f396",
        "0x74e45850085ff748b13342747395fdbff459f591a59f1978ddf10bc219fb5e17",
        "0x6f263559d5af7e9e24c3d011328d1cfad46e4bc6697f2b7df2ad513af31b0565",
        "0xb6b7a2513120a19ac502671916b0349e6df099d5b293f8c2b5f847b0ccc2aea1",
        "0xa92c4e7d44ea3984c7b9c774c68f47e39eacfcbfbce86bcf7998f6634497189f",
        "0xcef4d8a0baa0a4d99952af342612ce9fa366117c004fb3bd55dae6378dffe96e",
        "0x5acc4190b7e8a41b9f7ab2f7ed7c12061208e488a530ada0490d6afd52acddf3",
        "0x023c458a034b1ea163a1a8bd82466b5d4a9fe26ccb702dc10ef1410b5017153c",
        "0x8dac81011509516f6a2ee7fbb00125974b281569e3d4023f0afca84269e7584d",
        "0x2af698aa455cf327ef6a478a217a3a09a3ea75762b01af7edfa16f5897482c32",
        "0xce6e4c2a5e224ffce2488dbca64eae20e6644006e55be9763de4b5382420c158",
        "0xce24bcc330c21216c7498ba4ca0f1e42b052cd1973ae69d9fb61bd781f93d628",
        "0xe7aa8e6b1799ed77965634d4e3acd6e5ddafb3f1e9ee1117404a2faf9f27cb56",
        "0xcb2fe28c3c8939f400aa1e2f373556903a641e7f9ad380df1cb296a4e0ba79e6",
        "0x4e7f40938f9338b09fa56d90bfffd3aa6ce644b81b1bec100bd00e05b780c3ae",
        "0x8f590cd8d4f99a0a480bd5d9049e87deeccb0c4d1978ce52d0795b0e11a1b39e",
        "0xd6007975020d5962fcc57ecf573b834a1196ea55081bb567b119419ec3bd72df",
        "0xeaddf43f583a38eafdaf8da531925edd0de114c4443f7d9b765f2af3bb4f21d2",
        "0xa8cb3f9a49f5b475ccbbdd3361bcc5045c9cd071f76cd445a779e21eab94d1c3",
        "0xa99463b9e28b14ce156664c715d01e8f27190d21ca1ff88f76a7f6fefb90e842",
        "0xe6f25fd44aca9ec8fdcf3fdb3a8363a1a28fb72bce05d1f8d3740a2727878e45",
        "0x965139692c725b0349ce9f4653dbfb58cd153845d6b0ac171986e4d77a2929c2",
        "0xf5db4c4bd23dee34cf34b47db414b4888a9b85ce49500f1004a146ecfe0f3dcd",
        "0x853074e200715292dc03d38c9302fc235d8fa1d881386212d28036c0812a79ba",
        "0x54fcc7117810e6ea35ea3e95c59aa0fe8bc9290808737500e45a028d0a8e456a",
        "0x1bcd621a8b620b97d84d27021eda4681fcfa766c00bb928b9f6a5e7f47cd3a74",
        "0x2738ff9ebba04eced48891d9441b2f019d9f6abe126d86ad90ef684f7e8efe0e",
        "0x442b44c4843bf544f5d70e6514fa0b50b7f1fabcdfc4cf0bf9ad422a70bcb86f",
        "0x7ca231c0c96f7815fff59ab3ede606d68ac17fc601f0ad8b86698dc682fc716e",
        "0x5491a91b3f2485a738773b9487a6822fec873d2c3ed892a6add980a861b1acd0",
        "0x630f3483fca258afdd561fba54bdd57488747a6cc98b68fe0754942dcc94b39c",
        "0xb42e872633356c9cdd73b8a2a733515a0558ec23bdbfe4fbc2adfe0def75370e",
        "0xa8971e947e21e6806b009299ddc9d6c7b62e6827d86667b3af30aae3069711d6",
        "0x5fb0b23b57a6466b76e4ee920dc2b1693fb92eb0128be84a2f5deaec0d190bc7",
        "0x27f0afbb71fcdb83b90acb6477f8e0803a90d26becce3ec9101a4b65d2210956",
        "0x0f6cf7812c6e4a8c3b00d732b50e9928c43d59a2e515831d481cfcb80696a8f1",
        "0x93626be54de381723469b836ecb2cd8bcc53f0d50c77a5554ec8d98a0aaf4d7d",
        "0x0b5a7d539439a1aa120f7d884186014e111dadc3ac017e4a56eceec29e24eb2e",
        "0xcfb9a7e723cf72f699fa1232c9478c3dbf1b7fcdb944ed7ec28c6fa9ae47a935",
        "0xdeb6af330a0b4ca247e5046c02c9bfc8b602514aeef6851efc69330b62513d86",
        "0x32b0715a919d8e520f9f878fd06f12fce82a440a6e67efd6417bcdf4c14a4d37",
        "0x451771b7a1987f143bbd4e7ece7284ebb0dbc301a457937f8716a1e653ff4d0d",
        "0x6887ebd88efa3d7fdfd91a755b692ca284951db18d0c66c2c5ef0e82058fe7e3",
        "0xd7c649a105affe51a8ae585e265f9f1dbc2a046726c62b49098e97b74f42a9cb",
        "0xd352f42d36fa65e3fcf5ddafb60bfe24cd3c0a9bbecfacc5e1e76e9646d78632",
        "0x1482b7d53a9f1b6564f649f298bbf98f5409bf346f25d85114e70a5dc6d4c65d",
        "0x4bda44f58d57f2700daed125783dbba353a0ba8526b059cb4c5659863c90acbb",
        "0x5e2bda270c9a827cc94f92350a4d42f8832f0004f3b0d545d2bd4f16707d238c",
        "0x10f55da8a7c5d2c5ed87cdcd70221e39b5d67f53e20f49531814eb54eba49212",
        "0x2d8637381ada516bbb0221a7bfd7d0d3f092fef5462900abe729ee9a7d6de765",
        "0x38675e0e8d9a0ef6ffeb1cc884330d2d23db7da2974d4f51d948bd21be9a2b79",
        "0x1f0ac193be05346f5b291372ccd25be2b6d7a8022dc857fa2fb02982f1edda60",
        "0xc47bc468da682bc4dcbad6dc471d0d25c4402d43ee013199a63aace122c6c4ed",
        "0xa79c38ad68398c2ec84465e7482c6831d2bf523f2c4a54926b38e3b3f3456101",
        "0xe1237e324bf2f8703030ec0d8520cfe2bc1683ae3f5ef7afff1a3ebb0bcf8c17",
        "0x9809a3e32de0ec47958c82004bcfb4452ecaea0e420d685622cb3c2a852fbeff",
        "0x75d22097b53b74be6bd81b17346645adfa3c108d4da0563df7af209acd2c7ed4",
        "0x184036691bc6e7c6379bf2f8f4f5086d224db324d207a6169c6a9f13ccaae121",
        "0xf6a3e603970633450047c715e145f3c1e78a1e764811bf7fc2bd5e9139facfb7",
        "0x59098be14fdbf481e4a34efb0ed0f30778b2ab802070fa92f8cffa131f1e45bc",
        "0x0e1982531c527ff2b886e429c6aa0c74cc2226ab0d30ba25c1edb06f65e5c201",
        "0xdea2ee56e8818a5336ee26630b8b4978050b17c9474dc0cd2543f093850bf3a4",
        "0x1576b73a49deb0208a8fcd48de8ad855a3a9012c7c9c3432b3b985f953d1e292",
        "0xf74382f71a4ede6766f1dead34a073e533e78abdcdbcff7d6d5675409d0a69b5",
        "0x698085fb501a594a7d6018d117c8194af68f121fac894574715feddf5628b3a6",
        "0xbc150247ebcfa0b30aeb75050db6320c5780ef6a6339af65ccc928a74c5baa5e",
        "0x683e0e12b6bec95a58a993996ccd31ec06471c0c3b755a7b3e288ba4e4f8faa3",
        "0x258c1c5552397fc33878379b08b4b50fcf79f299771f6502480782e8485cb98f",
        "0x92b80a15307480bba4fc9f16b2e36dd87a45547a73dcf3996614a2013722a1c4",
        "0x024c8ea6f3e4ca2a6167099c19b2970e42ca3c2ccaf970d7213fea28968627b4",
        "0x88232c08c64ab9653b2845149479ebb9788f8f16f1f11e916921184e6865f6d7",
        "0x834f92475425ba4f7ba4da6d82edd8709f7026caee04de370c670567cdfe29c2",
        "0x18fa2036e07ee449c989c20a8c83d2fe5024e183d1f4927d8e7fffb246608295",
        "0x7b36e8e5409c26fefa737e3305e219a1b89d8e0eece784e049af11a8ca654e4b",
        "0xaa97921a711be12023147a0e97fb281243ca94b4c8a5fad27991f14ea1c3b9be",
        "0x282d48e50a55ea2d0b43e60f3fbe578990227175e2cd4e0bd9b262b3dce77b4a",
        "0x4063339f750e2bd524d0f66e536eb70a647514caccf144d8304eabf62ddfc40c",
        "0xe3d7e60843164050415905c3857d414b079146d465c88ba294633074b0deb2d1",
        "0xe916cfb44587c66f3cdcc0ccc6782e22418c5e35907349016d79ee5543e378e1",
        "0x22b8b3248718e1dd863627e883d014549deeb318e31327901ed13cd621e4eabc",
        "0x37a7c591b4a60c7af688e31c202e77e2d2ae08995f272cef72abc7bcd8d8fa40",
        "0xcae333dfebc3102eeaff8d26acbcd5896581833f8bb28fb89083e8b46790c325",
        "0xbd33501cd27801a7f06c8e3fd3e3c1c1d776f04cf63383a4cf4cd7f9935f7eff",
        "0x83b65ce507f9f2123662dbc135b5e9e973bb8567db7e57a728855d918fcc45a0",
        "0xa68024ecc4be42624eef45efbc1e6971a2e6f1ea4450ef4531c9e1da34123fdb",
        "0x9c15f01b82da5509cea4e006bf1217e550999b74290aa8ec4f1175d31eade8bb",
        "0xfbbe74913f115056a252a1ce2ac329842c56a85e3563ecb156d8df863a2c0738",
        "0xac91f57f7bcf7af592e8cf33f6cf475e36aca1564b3ef8d1e1e2d8f06c27bd8d",
        "0xa1981dae54d6824ee734e8a4fd2f8dac0883bae549498f2831c7224be4338800",
        "0x6aaed6f474ba2d560b9a1692e2958ac054319c51f309d391d5282c39bfcaa04e",
        "0xb23b5e62126e4de002dd6997307c09d9a162820a4eb7f18e4009a20e00e3c74e",
        "0xa93184ac07e4631ce464fc35224e56c308dd43eeb2cb163ddf82bbc732ae8c9f",
        "0x73349aa1e2ddc8d1bff5dd6a83c5572ef0f5cd6f81f171433b1e8c9ae7c02bf6",
        "0x0d956cbc6de9c0062d29b266182c3db94fc5d59449d0f92081f5ffaa5c6fd2c8",
        "0x69596a143065a08f37e4325b7bcc4f7fc8a5f3df4d866ee6f6e9f4eeed08f4d8",
        "0x9891d5b466a45e76713d01c4f3f4b9a7f75fca171b717ce52ac0a4509576a06f",
        "0x9b96a86c833f67e5c90acaab1f32dc04d554e47eb13e370e85c06e145b60fdcc",
        "0x2ae1fe78ccc3c908da9e75c571746205627db0d1a7cfdff05f42b615c9a7de22",
        "0x6ff4e57c55a8a5daa18a588b385f76852c6297b7f94f3b339d27c6705ce361f0",
        "0x551366565ad6ebd32e41aa5616dd972e40858ba4c55243f60281bfa67743168c",
        "0xa8accf897d9c3e6590fa243dd3f209a9e762ede7c65eb1ba331950d55fa8e8b1",
        "0xd32dabdebd20768b8e9c1f29479040cb1c14cf7f5b812273a7142e071b3354c8",
        "0x362855e111df4421e69d847d911825c8a7b7ae621b16e7513250bd0e9a547c22",
        "0xfb22424fb832e10b3d37c733f4b64a960b04faa6f8553452359eec8529c214cc",
        "0x2d8a2908d4a848649aecf7c80a5966075153049622e80bcf3e2f6071cb8bdc07",
        "0x25f5661f515955277964616b6fc13f4cdd532cd076015f9700078396636dd816",
        "0xdcf9b7430fb68776a5c32673d50537e21e5380bd085e70db5d5ef210ef590601",
        "0x4c296d875af49214ff2418d86ebe580e91a8a374865db18c5aa23670c1204307",
        "0x85f8cc8140482e96259a10228bd3bf48dac758e32462113ee528a17e3515507d",
        "0x0db52d98b6183e6188166f71e01e7bc8b48a626f92d460157b9b1c4051b072f8"
    ],
    "baseFeePerGas": {
        "type": "BigNumber",
        "hex": "0x08ba05ad3a"
    },
    "_difficulty": {
        "type": "BigNumber",
        "hex": "0x00"
    }
}
]

export default function TxList(props) {
    const { txType, title } = props;
    const [itemList, setItemList] = useState(Tx);

    if (txType !== "BLOCK" && txType !== "TX") {
        throw new Error("Invalid txType value");
    }

    useEffect(() => {
        // Listen for new blocks to be mined
        // if (txType === "BLOCK") {
        //     alchemy.ws.on("block", async (blockNumber) => {
        //         // Search for the block
        //         const block = await alchemy.core.getBlock(blockNumber);

        //         if (!block) return;

        //         console.log("A block was mined");
        //         console.log(block);
        //         addListItem(block);
        //     });
        // } 
        // // Listen for mined transactions
        // else {
        //     alchemy.ws.on({
        //         method: AlchemySubscription.MINED_TRANSACTIONS,
        //         includeRemoved: true,
        //         hashesOnly: false,
        //     }, async (tx) => {
        //         console.log("A transaction was mined");
        //         console.log(tx);
        //     });
        // }

        
        return () => {
            alchemy.ws.removeAllListeners();
        }
    }, [itemList]);

    function shiftListRight(list) {
        if (list?.length === undefined || list?.length === null) return null;
        if (list.length <= 1) return list;

        let x = null;

        // At least two elements in the list at this point
        for (let i=0; i <= list.length - 2; i++) {
            // The current item will be for the first loop the first list element
            const currentItem = !x ? list[i] : x;  

            // Store the value of the next element before it's replaced by the current one
            x = list[i + 1];

            // The next list element is the current one
            list[i + 1] = currentItem;

            // If it's the first loop, set the first item as 0 (will be replaced)
            if (i === 0) {
                list[i] = 0;
            }

        }

        return list;
    }

    function addListItem(item) {
        if (itemList.length >= 6) {
            removeListItem();
        } else {
            // If the item is less than 6, just push the element at the tail
            console.log("Adding an element... ", itemList.length)
            // setItemList([...itemList, item]);;
            setItemList((prev) => [...prev, item]);
            return;
        }

        console.log("Will add an item")

        // Shift the list to the right
        const newList = shiftListRight([...itemList]);

        console.log("Shifted list")
        console.log(newList)

        // Insert the element at the first index
        newList[0] = item;

        console.log("After the item is added at the head")
        console.log(newList)

        setItemList(newList);
    }

    // Remove the first element (since it's the first one to be added)
    function removeListItem() {
        if (itemList.length === 0) return;

        console.log("Will remove an item")

        // Get a new list where the first element is not present
        const newList = [...itemList].slice(1);
        
        setItemList(newList);
    }

    return (
        <div className="p-4 rounded-lg border border-[#e9ecef]">
            <p className="text-[15px] px-2 py-4"> { title } </p>
            <hr className="bg-[#e9ecef] w-full" />
            <div className="flex flex-col gap-2 bg-white text-[14.5px]">
                {
                    itemList?.map((item, index) => {
                        const { hash, number, to, from, transactions } = item;

                        const minedAt = "30 segs";
                        const value = 0.05702
                        
                        return (
                            <>
                            <div className="flex items-center justify-between px-2 py-4" key={ number || hash }>
                                <div className="flex items-center gap-4">
                                    {
                                        txType === "BLOCK" ? (
                                            <CubeIcon height="25" width="25" />
                                        ) : (
                                            <DocumentTextIcon height="25" width="25" />
                                        )
                                    }
                                    <div className="flex flex-col">
                                        <p className=""> { number || hash?.slice(0, 20) } </p> 
                                        <p className="text-[12.68px]"> { minedAt } </p> 
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                   {
                                    txType === "BLOCK" ? (
                                        <>
                                            <p className=""> Fee Recipient <span className=""> {to || "antbuilder"} </span> </p>
                                            <p className=""> { transactions?.length || 114 } <span className=""> txns in 12 secs </span> </p>
                                        </>
                                    ) : (
                                       <>
                                        <p className=""> From <span> {from?.slice(0, 20) || "0xc9D945...C42417fb"} </span> </p>
                                        <p className=""> To <span> {to?.slice(0, 20) || "0xc9D945...C42417fb"} </span> </p>
                                       </> 
                                    )
                                   } 
                                </div>
                                <div className="rounded-md p-1 bg-slate-100">
                                    <p className="text-[10.87px] font-semibold"> { `${value} Eth` } </p>
                                </div>
                            </div>
                            {
                                index < itemList.length - 1  ? <hr className="px-4 bg-[#e9ecef] w-full" /> : null
                            }
                            </>
                        )
                    })
                }
            </div>
            <div className="bg-[#F8F9FA] h-[50px] flex justify-center items-center">
                <p className="uppercase text-[12px] text-center"> View all { txType === "BLOCK" ? "blocks" : "transactions" } </p>
            </div>
        </div>
    )
}