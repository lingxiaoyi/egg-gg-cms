'use strict';
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const projects = await ctx.model.Projects.findAll({
      attributes: [ 'id', 'project' ],
      where: {
        project: '东方体育H5',
      },
    });
    for (const project of projects) {
      let docsProObj = {}; // 每个项目生成的大JSON广告

      const pages = await ctx.model.Pages.findAll({
        attributes: [ 'id', 'pageType', 'projectId', 'name' ],
        where: {
          projectId: project.id,
        },
      });
      const qids = await ctx.model.Qids.findAll({
        attributes: [ 'id', 'qid', 'hidden' ],
        where: {
          projectId: project.id,
        },
      });
      for (const page of pages) {
        docsProObj[page.name] = {};
        for (const qid of qids) {
          docsProObj[page.name][qid.qid] = [];
          const ads = await ctx.model.Ads.findAll({
            attributes: [ 'id', 'projectId', 'pageId', 'qidId', 'ggId', 'ggType', 'hidden' ],
            where: {
              projectId: project.id,
              pageId: page.id,
              qidId: qid.id,
            },
          });
          for (const ad of ads) {
            docsProObj[page.name][qid.qid].push(ad.ggId);
          }
        }
      }
      const optionObj = {
        videoPatchGg: { // 视频贴片广告
          tiyu360dhkz: 'u3104714',
          qid02393: 'u3133360',
        },
        detailGGAddThree: {
          null: [
            'uphlomrrr',
          /* 'avnbxdebeycx',
            'ezrfbhifwcgorvwy'*/
          ],
          tiyuvivobrowser01: [
            'rmesouvuupt',
          /* 'ezrfbhofvcgorvwy',
            'fasgcipgxdh'*/
          ],
        },
        indexNoChannel: [
          'tudp264cdm',
          'vwd71hwrbn',
          'xydozxu734',
          'b3ds8fgw26',
          'd5da7v97tm',
          'f7dr677mrn',
          'jbdqy43cgf',
          'kcdhgcw2rn',
          'nfdpwvt257',
          'ogdge4srh5',
          'bwocoltoxzdec',
          'cxpdpmupzaedgm',
          'uphvhemlvswrxv',
          'ytlzliqppwai',
          'dyqeqnvuabfhnqu',
        ],
        detailNoChannel: [
          'kfxcelghx',
          'lgydfmhic',
          'mhzegnije',
          'niafhojkh',
          'ojbgipklk',
          'pkchjqlmm',
          'qldikrmnt',
          'idvacjelj',
          'jewbdkfmn',
          'kfxcelgnu',
          'lgydfmhoy',
          'mhzegnipd',
          'niafhojqf',
          'ojbgipkri',
          'pkchjqlsl',
          'qldikrmtn',
          'rmejlsnuu',
          'avnsubxbb',
          'bwotvcycf',
          'cxpuwdzdm',
          'dyqvxeaeq',
          'ezrwyfbfv',
        ],
        detailNewAd: [
          'kfxoghcgo',
          'mhzqijeiz',
          'niarjkfje',
          'pkctlmhlj',
          'kfxoghchl',
        ],
        sgGg: {
          tiyutytt: {
            list: {
              id: '921693',
              height: '121',
            },
            detail: {
              id: '860460',
              height: '80',
            },
          },
        },
        detailArticle: {
          qid10464: 'jewabmaat',
          qid10465: 'kfxbcnbbx',
          qid10466: 'lgycdoccc',
          qid10467: 'niaefqeeh',
          qid10468: 'qldhithht',
          qid10469: 'jewabmabn',
          qid10470: 'mhzdepded',
          qid10471: 'qldhithin',
          qid10472: 'kfxbcnbeo',
          qid10473: 'ojbfgrfig',
          qid10474: 'qldhithkm',
          qid10475: 'lgycdochp',
          qid11032: 'jewbmtbtb',
        },
        worldcupNewAd: {
          qid10464: [
            'niaehehhh',
            'qldhkhkkt',
            'lgycfcfhy',
            'qldhkhkmn',
            'kfxbebeho',
            'ojbfifilg',
            'qldhkhknm',
            'lgycfcfop',
            'niaehehqa',
            'rmeililun',
            'ezrvyvafo',
          ],
          qid10465: [
            'jewadafkf',
            'gbtxaxcxh',
            'lgycfchip',
            'pkcgjglmh',
            'togknkpqw',
            'uphlolqxx',
            'gbtxaxdht',
            'idvzczfja',
            'jewadagkd',
            'lgycfcimi',
            'faswzwcjj',
          ],
          qid10466: [
            'hcuybyelu',
            'jewadagnb',
            'kfxbebhoe',
            'lgycfciph',
            'mhzdgdjqj',
            'hcuybyerr',
            'niaehekxk',
            'gbtxaxdth',
            'jewadagww',
            'lgycfciyd',
            'pkcgjgmcs',
          ],
          qid10467: [
            'idvzczfzm',
            'jewadagat',
            'lgycfcicc',
            'niaehekeh',
            'pkcgjgmgm',
            'jewadagbn',
            'kfxbebhcu',
            'mhzdgdjed',
            'ojbfiflgi',
            'pkcgjgmhl',
            'qldhkhnin',
          ],
          qid10468: [
            'jewadagdk',
            'kfxbebheo',
            'lgycfcifv',
            'mhzdgdjgz',
            'niaehekhe',
            'pkcgjgmjj',
            'qldhkhnkm',
            'rmeiliolo',
            'snfjmjpmv',
            'kfxbebhgl',
            'mhzdgdjiw',
          ],
          qid10469: [
            'niaehekja',
            'pkcgjgmlh',
            'qldhkhnmk',
            'rmeilionn',
            'snfjmjpop',
            'togknkqpw',
            'mhzdgdjjq',
            'niaehekkx',
            'ojbfifllb',
            'pkcgjgmmg',
            'rmeiliool',
          ],
          qid10470: [
            'snfjmjppo',
            'togknkqqq',
            'qldhkkkht',
            'niaehekqr',
            'ojbfiflry',
            'qldhkhnth',
            'rmeiliouj',
            'snfjmjpvm',
            'togknkqwp',
            'uphlolrxr',
            'vqimpmsyy',
          ],
          qid10471: [
            'faswzwigj',
            'gbtxaxjhq',
            'idvzczljz',
            'kfxbebnle',
            'lgycfcomh',
            'mhzdgdpnj',
            'niaeheqoq',
            'gbtxaxjkk',
            'hcuybyklr',
            'idvzczlmv',
            'jewadamna',
          ],
          qid10472: [
            'lgycfcopf',
            'mhzdgdpqi',
            'niaeheqrk',
            'ojbfifrsr',
            'hcuybykrl',
            'idvzczlss',
            'jewadamtw',
            'kfxbebnub',
            'mhzdgdpwg',
            'ojbfifryl',
            'pkcgjgszs',
          ],
          qid10473: [
            'ojbfifrfi',
            'rmeiliuiu',
            'jewadambk',
            'lgycfcodv',
            'niaeheqfe',
            'pkcgjgshj',
            'snfjmjvkv',
            'niaeheqha',
            'pkcgjgsjh',
            'rmeiliuln',
            'togknkwnw',
          ],
          qid10474: [
            'niaeheqjx',
            'rmeiliunl',
            'uphlolxqx',
            'pkcgjgsmc',
            'snfjmjvpm',
            'ojbfifrrs',
            'pkcgjgssz',
            'uphlolxrr',
            'qldhkhtnh',
            'niaeheqkr',
            'snfjmjvoo',
          ],
          qid10475: [
            'ojbfifrgg',
            'qldhkhtim',
            'rmeiliujo',
            'lgycfcofp',
            'mhzdgdpgw',
            'ojbfifrif',
            'qldhkhtkk',
            'snfjmjvmp',
            'mhzdgdpiq',
            'ojbfifrkb',
            'qldhkhtmi',
          ],
          qid10603: [
            'mhzdgijgn',
            'ojbfikliy',
            'qldhkmnkh',
            'togknpqnp',
            'qldhkmnmd',
            'qldhkmnna',
            'snfjmoppj',
            'togknpqql',
            '',
            '',
            '',
          ],
          qid10602: [
            'mhzdgijgn',
            'ojbfikliy',
            'qldhkmnkh',
            'togknpqnp',
            'qldhkmnmd',
            'qldhkmnna',
            'snfjmoppj',
            'togknpqql',
            '',
            '',
            '',
          ],
          qid10479: [
            'idvzeaaam',
            'kfxbgcccx',
            'ojbfkgggk',
            'qldhmiiit',
            'idvzeaacj',
            'jewafbbdn',
            'lgychddfy',
            'niaejffhf',
            '',
            '',
            '',
          ],
        },
        worldcupTopAd: {
          null: [
            'gbtxaaqak',
            'hcuybbrbr',
          ],
          qid10601: [
            'hcuybzkll',
            'lgycfdopd',
          ],
          qid10464: [
            'mhzdgepqg',
            'niaehfqrj',
          ],
          qid10465: [
            'ojbfigrsl',
            'pkcgjhsts',
          ],
          qid10466: [
            'hcuybzkri',
            'qldhkitdn',
          ],
          qid10467: [
            'jewadbmtt',
            'rmeiljueu',
          ],
          qid10468: [
            'kfxbecnux',
            'jewadbmak',
          ],
          qid10469: [
            'lgycfdovc',
            'mhzdgepdz',
          ],
          qid10470: [
            'mhzdgepwe',
            'pkcgjhsgj',
          ],
          qid10471: [
            'niaehfqxh',
            'rmeiljuio',
          ],
          qid10472: [
            'ojbfigryk',
            'kfxbecncl',
          ],
          qid10473: [
            'qldhkitat',
            'mhzdgepew',
          ],
          qid10474: [
            'idvzcalvj',
            'ojbfigrgf',
          ],
          qid10475: [
            'kfxbecnxu',
            'pkcgjhshh',
          ],
          qid10476: [
            'lgycfdoyy',
            'rmeiljujn',
          ],
          qid10477: [
            'mhzdgepzd',
            'snfjmkvkp',
          ],
          qid10604: [
            'niaehfqaf',
            'lgycfdofm',
          ],
          qid10478: [
            'ojbfigrbi',
            'niaehfqhx',
          ],
          qid10479: [
            'pkcgjhscl',
            'pkcgjhsjg',
          ],
          qid10480: [
            'idvzcezam',
            'kfxbegbcx',
          ],
          qid10603: [
            'togknpqkw',
            'niaehjkfx',
          ],
          qid10602: [
            'togknpqkw',
            'niaehjkfx',
          ],
        },
        loginOpenAd: {
          qid10465: [
            'niaehkjhr',
          ],
          qid10466: [
            'ojbfilkiy',
          ],
          qid10467: [
            'niaejrkhh',
          ],
          qid10468: [
            'rmeilonlj',
          ],
          qid10469: [
            'snfjmpomm',
          ],
          qid10470: [
            'ojbfkslik',
          ],
          qid10471: [
            'pkcgltmjm',
          ],
          qid10472: [
            'qldhmunkt',
          ],
          qid10473: [
            'uphhxoxqm',
          ],
          qid10474: [
            'ytllbsbub',
          ],
          qid10475: [
            'vqiiypssp',
          ],
          qid10464: [
            'mhzdiqjge',
          ],
          qid10479: [
            'ezrvaiavf',
          ],
        },
      }; // 固定的广告配置 变化慢的
      docsProObj = Object.assign({}, docsProObj, optionObj);
      const target = path.join(this.config.baseDir, 'app/public/ad', 'ad.channel.js');
      // 生成一个文件写入 文件流
      await fs.writeFile(target, `module.exports = ${JSON.stringify(docsProObj)}`);
      // 文件响应
      ctx.body = 'OK';
    }
  }
  async menu() {
    const ctx = this.ctx;
    const data = await ctx.model.Projects.findAll();
    const obj = {};
    obj.project = data;
    for (const item of data) {
      obj[item.project] = await ctx.model.Pages.findAll({
        where: {
          projectId: item.id,
        },
      });
    }
    ctx.body = obj;
  }
}

module.exports = HomeController;
